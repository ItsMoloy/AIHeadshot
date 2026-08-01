// app/api/upload/route.ts

// Securely uploads image to ImgBB and returns the public URL

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const imageFile = formData.get("image") as File | null;

        if (!imageFile) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Validate type
        if (!["image/jpeg", "image/png", "image/webp"].includes(imageFile.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, and WebP are accepted." },
                { status: 400 }
            );
        }

        // Validate size (5MB)
        if (imageFile.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 5MB." },
                { status: 400 }
            );
        }

        const apiKey = process.env.IMGBB_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "ImgBB API key is not configured." },
                { status: 500 }
            );
        }

        // Convert File to base64
        const arrayBuffer = await imageFile.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        // Upload to ImgBB
        const imgbbForm = new FormData();
        imgbbForm.append("key", apiKey);
        imgbbForm.append("image", base64);
        imgbbForm.append("expiration", "600"); // 10 minutes — enough for Replicate

        const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: imgbbForm as any,
        });

        if (!imgbbResponse.ok) {
            const errorText = await imgbbResponse.text();
            console.error("ImgBB error:", errorText);
            return NextResponse.json(
                { error: "Failed to upload image to hosting service." },
                { status: 502 }
            );
        }

        const imgbbData = await imgbbResponse.json();

        if (!imgbbData.success) {
            return NextResponse.json(
                { error: "Image hosting failed. Please try again." },
                { status: 502 }
            );
        }

        return NextResponse.json({
            url: imgbbData.data.url,
            displayUrl: imgbbData.data.display_url,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Internal server error during upload." },
            { status: 500 }
        );
    }
}
