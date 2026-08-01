"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import DropZone from "./DropZone";
import ComparisonSlider from "./ComparisonSlider";
import { DEFAULT_PROMPT } from "@/lib/professions";

interface HeadshotGeneratorProps {
    defaultPrompt?: string;
    professionLabel?: string;
}

type Step = "upload" | "prompt" | "loading" | "result" | "error";

export default function HeadshotGenerator({
    defaultPrompt = DEFAULT_PROMPT,
    professionLabel,
}: HeadshotGeneratorProps) {
    const [step, setStep] = useState<Step>("upload");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState(defaultPrompt);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loadingStatus, setLoadingStatus] = useState("Uploading photo…");

    const handleFileAccepted = useCallback((acceptedFile: File) => {
        setFile(acceptedFile);
        const url = URL.createObjectURL(acceptedFile);
        setPreviewUrl(url);
        setStep("prompt");
        setResultUrl(null);
        setErrorMessage(null);
    }, []);

    const handleReset = useCallback(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setFile(null);
        setPreviewUrl(null);
        setResultUrl(null);
        setErrorMessage(null);
        setPrompt(defaultPrompt);
        setStep("upload");
    }, [previewUrl, defaultPrompt]);

    const handleGenerate = useCallback(async () => {
        if (!file) return;

        setStep("loading");
        setErrorMessage(null);

        try {
            // Step 1: Upload to ImgBB via our API route
            setLoadingStatus("Uploading your photo securely…");
            const uploadForm = new FormData();
            uploadForm.append("image", file);

            const uploadRes = await fetch("/api/upload", {
                method: "POST",
                body: uploadForm,
            });

            const uploadData = await uploadRes.json();

            if (!uploadRes.ok || !uploadData.url) {
                throw new Error(uploadData.error || "Failed to upload image.");
            }

            // Step 2: Generate headshot via our API route
            setLoadingStatus("AI is generating your professional headshot…");
            const generateRes = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: uploadData.url, prompt }),
            });

            const generateData = await generateRes.json();

            if (!generateRes.ok || !generateData.resultUrl) {
                throw new Error(generateData.error || "Generation failed. Please try again.");
            }

            setResultUrl(generateData.resultUrl);
            setStep("result");
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
            setStep("error");
        }
    }, [file, prompt]);

    const handleDownload = useCallback(async () => {
        if (!resultUrl) return;
        try {
            const response = await fetch(resultUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `ai-headshot-${Date.now()}.webp`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch {
            // Fallback: open in new tab
            window.open(resultUrl, "_blank");
        }
    }, [resultUrl]);

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* === STEP: UPLOAD === */}
            {step === "upload" && (
                <div className="animate-fade-in-up">
                    {professionLabel && (
                        <div className="text-center mb-6">
                            <span className="inline-flex items-center gap-2 bg-brand-950/60 border border-brand-700/40 text-brand-300 text-sm font-medium px-4 py-2 rounded-full">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                                Optimized for {professionLabel}
                            </span>
                        </div>
                    )}
                    <DropZone onFileAccepted={handleFileAccepted} isDisabled={false} />
                </div>
            )}

            {/* === STEP: PREVIEW + PROMPT === */}
            {step === "prompt" && previewUrl && (
                <div className="animate-fade-in-up space-y-5">
                    {/* Preview */}
                    <div className="bg-dark-700/60 border border-dark-500 rounded-2xl p-4">
                        <div className="flex items-center gap-4">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-dark-400 shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-slate-200 font-semibold truncate">{file?.name}</p>
                                <p className="text-slate-400 text-sm mt-0.5">
                                    {file ? `${(file.size / 1024).toFixed(1)} KB` : ""}
                                </p>
                                <button
                                    onClick={handleReset}
                                    className="mt-2 text-xs text-brand-400 hover:text-brand-300 transition-colors duration-150 flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Change photo
                                </button>
                            </div>
                            <div className="shrink-0">
                                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prompt input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                            <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Style prompt{" "}
                            <span className="text-slate-500 font-normal">(optional — customize your look)</span>
                        </label>
                        <textarea
                            id="style-prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            rows={3}
                            placeholder="e.g., professional lawyer, dark suit, law library background, confident expression"
                            className="
                w-full bg-dark-700/80 border border-dark-400 rounded-xl px-4 py-3
                text-slate-200 placeholder-slate-500 text-sm
                focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/60
                transition-all duration-200 resize-none
              "
                        />
                        <p className="text-xs text-slate-500">
                            Tip: Describe your profession, attire, background, and lighting for best results.
                        </p>
                    </div>

                    {/* Quick style presets */}
                    <div className="space-y-2">
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Quick styles</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: "Corporate", value: "professional corporate headshot, business suit, clean office background, soft studio lighting, confident smile, 4k portrait" },
                                { label: "Doctor", value: "professional doctor, white lab coat, stethoscope, hospital background, soft lighting, confident smile, 4k portrait" },
                                { label: "Tech / Casual", value: "software engineer, smart casual, modern tech office background, friendly smile, warm natural lighting, 4k portrait" },
                                { label: "Creative", value: "creative director, stylish modern attire, agency background, artistic confident expression, professional lighting, 4k portrait" },
                                { label: "LinkedIn", value: "professional LinkedIn headshot, business formal, neutral light background, warm friendly smile, studio lighting, 4k portrait" },
                            ].map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => setPrompt(preset.value)}
                                    className="
                    text-xs px-3 py-1.5 rounded-lg border transition-all duration-150
                    border-dark-400 bg-dark-600 text-slate-400
                    hover:border-brand-500/60 hover:bg-brand-950/40 hover:text-brand-300
                  "
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate button */}
                    <button
                        id="generate-btn"
                        onClick={handleGenerate}
                        className="
              w-full py-4 rounded-2xl font-bold text-lg text-white
              bg-gradient-to-r from-brand-600 to-purple-600
              hover:from-brand-500 hover:to-purple-500
              shadow-xl shadow-brand-500/20 hover:shadow-brand-500/40
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
              flex items-center justify-center gap-3
              animate-pulse-glow
            "
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate AI Headshot — Free
                    </button>

                    <p className="text-center text-xs text-slate-500">
                        ✅ No account needed &nbsp;•&nbsp; ✅ 100% free &nbsp;•&nbsp; ✅ Result in ~30–60 seconds
                    </p>
                </div>
            )}

            {/* === STEP: LOADING === */}
            {step === "loading" && (
                <div className="animate-fade-in-up flex flex-col items-center justify-center py-16 space-y-6">
                    {/* Spinner */}
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-dark-500" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-400 animate-spin" />
                        <div className="absolute inset-3 rounded-full bg-brand-950/40 flex items-center justify-center">
                            <svg className="w-6 h-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-slate-200 font-semibold text-lg">{loadingStatus}</p>
                        <p className="text-slate-400 text-sm mt-1">This usually takes 30–90 seconds…</p>
                    </div>

                    {/* Shimmer progress bar */}
                    <div className="w-64 h-1.5 bg-dark-600 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full animate-shimmer"
                            style={{
                                background: "linear-gradient(90deg, transparent 0%, #6272f1 50%, transparent 100%)",
                                backgroundSize: "200% 100%",
                            }}
                        />
                    </div>

                    <p className="text-xs text-slate-500 max-w-xs text-center">
                        Our AI is analyzing your photo and applying professional portrait enhancements…
                    </p>
                </div>
            )}

            {/* === STEP: RESULT === */}
            {step === "result" && resultUrl && previewUrl && (
                <div className="animate-fade-in-up space-y-6">
                    {/* Success badge */}
                    <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Your AI headshot is ready!</span>
                    </div>

                    {/* Result image */}
                    <div className="relative rounded-2xl overflow-hidden border border-dark-400 bg-dark-700">
                        <Image
                            src={resultUrl}
                            alt="AI Generated Headshot"
                            width={600}
                            height={600}
                            className="w-full object-cover"
                            unoptimized
                            priority
                        />
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            id="download-btn"
                            onClick={handleDownload}
                            className="
                flex-1 flex items-center justify-center gap-2
                py-3.5 rounded-xl font-bold text-white
                bg-gradient-to-r from-brand-600 to-purple-600
                hover:from-brand-500 hover:to-purple-500
                shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              "
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Headshot
                        </button>
                        <button
                            onClick={handleReset}
                            className="
                flex items-center justify-center gap-2
                px-5 py-3.5 rounded-xl font-semibold
                border border-dark-400 bg-dark-700 text-slate-300
                hover:bg-dark-600 hover:text-white hover:border-dark-300
                transition-all duration-200
              "
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Try Again
                        </button>
                    </div>

                    {/* Before/After comparison slider */}
                    <ComparisonSlider
                        beforeSrc={previewUrl}
                        afterSrc={resultUrl}
                        beforeLabel="Original"
                        afterLabel="AI Headshot"
                    />
                </div>
            )}

            {/* === STEP: ERROR === */}
            {step === "error" && (
                <div className="animate-fade-in-up space-y-4">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-red-300 font-semibold mb-2">Generation failed</p>
                        <p className="text-slate-400 text-sm">{errorMessage}</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleGenerate}
                            className="
                flex-1 py-3 rounded-xl font-semibold text-white
                bg-brand-600 hover:bg-brand-500
                transition-all duration-200
              "
                        >
                            Try Again
                        </button>
                        <button
                            onClick={handleReset}
                            className="
                flex-1 py-3 rounded-xl font-semibold
                border border-dark-400 bg-dark-700 text-slate-300
                hover:bg-dark-600 transition-all duration-200
              "
                        >
                            Start Over
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
