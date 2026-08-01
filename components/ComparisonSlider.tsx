"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";

interface ComparisonSliderProps {
    beforeSrc: string; // original uploaded image (object URL)
    afterSrc: string;  // generated AI headshot URL
    beforeLabel?: string;
    afterLabel?: string;
}

export default function ComparisonSlider({
    beforeSrc,
    afterSrc,
    beforeLabel = "Original",
    afterLabel = "AI Headshot",
}: ComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updateSlider = useCallback(
        (clientX: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setSliderPosition(percentage);
        },
        []
    );

    // Mouse events
    const handleMouseDown = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            setIsDragging(true);
            updateSlider(e.clientX);
        },
        [updateSlider]
    );

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        },
        [isDragging, updateSlider]
    );

    const handleMouseUp = useCallback(() => setIsDragging(false), []);

    // Touch events
    const handleTouchStart = useCallback(
        (e: React.TouchEvent) => {
            setIsDragging(true);
            updateSlider(e.touches[0].clientX);
        },
        [updateSlider]
    );

    const handleTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (!isDragging) return;
            updateSlider(e.touches[0].clientX);
        },
        [isDragging, updateSlider]
    );

    const handleTouchEnd = useCallback(() => setIsDragging(false), []);

    return (
        <div className="w-full space-y-3">
            <h3 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider">
                Before / After Comparison
            </h3>

            <div
                ref={containerRef}
                className="relative w-full overflow-hidden rounded-2xl border border-dark-500 cursor-ew-resize select-none"
                style={{ aspectRatio: "1 / 1" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* After image (full width, behind) */}
                <div className="absolute inset-0">
                    <Image
                        src={afterSrc}
                        alt="AI Generated Headshot"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 600px"
                        unoptimized
                    />
                </div>

                {/* Before image (clipped to left portion) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={beforeSrc}
                        alt="Original Photo"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ maxWidth: "none" }}
                    />
                </div>

                {/* Divider line */}
                <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                    style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                >
                    {/* Handle knob */}
                    <div
                        className={`
              absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-10 h-10 rounded-full bg-white shadow-xl
              flex items-center justify-center
              transition-transform duration-150
              ${isDragging ? "scale-110" : "scale-100"}
            `}
                    >
                        <svg
                            className="w-5 h-5 text-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M8 9l-3 3 3 3M16 9l3 3-3 3"
                            />
                        </svg>
                    </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3">
                    <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {beforeLabel}
                    </span>
                </div>
                <div className="absolute top-3 right-3">
                    <span className="bg-brand-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {afterLabel}
                    </span>
                </div>
            </div>

            <p className="text-center text-xs text-slate-500">
                Drag the slider to compare before and after
            </p>
        </div>
    );
}
