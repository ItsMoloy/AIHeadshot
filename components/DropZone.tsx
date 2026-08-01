"use client";

import React, { useCallback, useState } from "react";

interface DropZoneProps {
    onFileAccepted: (file: File) => void;
    isDisabled?: boolean;
}

export default function DropZone({ onFileAccepted, isDisabled }: DropZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateAndAccept = useCallback(
        (file: File) => {
            setError(null);

            if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                setError("Please upload a JPEG, PNG, or WebP image.");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError("File is too large. Maximum size is 5MB.");
                return;
            }

            onFileAccepted(file);
        },
        [onFileAccepted]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragOver(false);
            if (isDisabled) return;

            const file = e.dataTransfer.files[0];
            if (file) validateAndAccept(file);
        },
        [isDisabled, validateAndAccept]
    );

    const handleDragOver = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!isDisabled) setIsDragOver(true);
        },
        [isDisabled]
    );

    const handleDragLeave = useCallback(() => {
        setIsDragOver(false);
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) validateAndAccept(file);
            // Reset input so same file can be re-selected
            e.target.value = "";
        },
        [validateAndAccept]
    );

    return (
        <div className="w-full">
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          relative flex flex-col items-center justify-center w-full min-h-[200px]
          border-2 border-dashed rounded-2xl p-8 text-center
          transition-all duration-300 cursor-pointer group
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
          ${isDragOver
                        ? "border-brand-400 bg-brand-950/40 scale-[1.02]"
                        : "border-dark-500 hover:border-brand-500/60 bg-dark-700/50 hover:bg-dark-700"
                    }
        `}
            >
                {/* Upload icon */}
                <div
                    className={`
            w-16 h-16 mb-4 rounded-full flex items-center justify-center
            transition-all duration-300
            ${isDragOver ? "bg-brand-500/30 scale-110" : "bg-dark-600 group-hover:bg-brand-950/60"}
          `}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-8 h-8 transition-colors duration-300 ${isDragOver ? "text-brand-300" : "text-slate-400 group-hover:text-brand-400"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                </div>

                <p className="text-lg font-semibold text-slate-200 mb-1">
                    {isDragOver ? "Drop your photo here!" : "Drag & drop your selfie"}
                </p>
                <p className="text-sm text-slate-400 mb-4">
                    JPEG, PNG, WebP • Max 5MB
                </p>

                {/* Browse button */}
                <label
                    className={`
            inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
            text-sm font-semibold transition-all duration-200
            ${isDisabled
                            ? "bg-dark-600 text-slate-500 cursor-not-allowed"
                            : "bg-brand-600 hover:bg-brand-500 text-white cursor-pointer shadow-lg hover:shadow-brand-500/25"
                        }
          `}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Browse Files
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="sr-only"
                        disabled={isDisabled}
                        onChange={handleFileInput}
                        id="file-upload"
                    />
                </label>

                <p className="text-xs text-slate-500 mt-3">
                    Tip: A well-lit, front-facing photo gives the best results
                </p>
            </div>

            {/* Error message */}
            {error && (
                <div className="mt-3 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}
        </div>
    );
}
