// app/api/generate/route.ts
// Securely calls Replicate API to generate AI headshot from a public image URL

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 120; // Replicate can take up to 2 minutes

// PhotoMaker Style model on Replicate
const REPLICATE_MODEL =
    "tencentarc/photomaker-style:467d062309da518648ba89d226490e02b8ed09b5abc15026e54e31c5a8cd0769";

interface GenerateRequestBody {
    imageUrl: string;
    prompt?: string;
}

async function pollReplicatePrediction(
    predictionId: string,
    token: string,
    maxAttempts = 60
): Promise<string> {
    for (let i = 0; i < maxAttempts; i++) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // poll every 2s

        const pollRes = await fetch(
            `https://api.replicate.com/v1/predictions/${predictionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!pollRes.ok) {
            throw new Error(`Polling failed: ${pollRes.statusText}`);
        }

        const prediction = await pollRes.json();

        if (prediction.status === "succeeded") {
            const output = prediction.output;
            if (Array.isArray(output) && output.length > 0) {
                return output[output.length - 1] as string;
            }
            throw new Error("No output URL from model.");
        }

        if (prediction.status === "failed" || prediction.status === "canceled") {
            throw new Error(
                `Generation failed: ${prediction.error || "Model returned an error."}`
            );
        }

        // statuses: "starting", "processing" → keep polling
    }

    throw new Error("Generation timed out. Please try again.");
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as GenerateRequestBody;
        const { imageUrl, prompt } = body;

        if (!imageUrl) {
            return NextResponse.json({ error: "Image URL is required." }, { status: 400 });
        }

        const token = process.env.REPLICATE_API_TOKEN;
        if (!token) {
            return NextResponse.json(
                { error: "Replicate API token is not configured." },
                { status: 500 }
            );
        }

        const finalPrompt = prompt?.trim()
            ? `${prompt.trim()} img`  // PhotoMaker needs "img" trigger word
            : "professional corporate headshot, business suit, clean office background, soft studio lighting, confident smile, 4k portrait img";

        // Create prediction
        const createRes = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                version: REPLICATE_MODEL.split(":")[1],
                input: {
                    prompt: finalPrompt,
                    input_image: imageUrl,
                    style_strength_ratio: 20,
                    num_outputs: 1,
                    num_steps: 50,
                    guidance_scale: 5,
                    negative_prompt:
                        "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, blurry",
                },
            }),
        });

        if (!createRes.ok) {
            const errorData = await createRes.json().catch(() => ({}));
            console.error("Replicate create error:", errorData);
            return NextResponse.json(
                {
                    error:
                        (errorData as { detail?: string }).detail ||
                        "Failed to start generation. Check your Replicate API token.",
                },
                { status: createRes.status }
            );
        }

        const prediction = await createRes.json();
        const predictionId = prediction.id as string;

        // Poll for result
        const resultUrl = await pollReplicatePrediction(predictionId, token);

        return NextResponse.json({ resultUrl });
    } catch (error) {
        console.error("Generate error:", error);
        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unexpected error during generation.",
            },
            { status: 500 }
        );
    }
}
