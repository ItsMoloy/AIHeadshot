import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            colors: {
                brand: {
                    50: "#f0f4ff",
                    100: "#e0e9ff",
                    200: "#c7d7fe",
                    300: "#a5b9fc",
                    400: "#8196f8",
                    500: "#6272f1",
                    600: "#4f53e5",
                    700: "#4141ca",
                    800: "#3636a3",
                    900: "#313181",
                    950: "#1e1c4b",
                },
                dark: {
                    900: "#0a0a0f",
                    800: "#111118",
                    700: "#1a1a24",
                    600: "#24242f",
                    500: "#2e2e3a",
                },
            },
            animation: {
                "gradient-shift": "gradientShift 6s ease infinite",
                "pulse-glow": "pulseGlow 2s ease-in-out infinite",
                "fade-in-up": "fadeInUp 0.6s ease forwards",
                shimmer: "shimmer 1.5s infinite",
            },
            keyframes: {
                gradientShift: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 20px rgba(98, 114, 241, 0.3)" },
                    "50%": { boxShadow: "0 0 40px rgba(98, 114, 241, 0.6)" },
                },
                fadeInUp: {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
