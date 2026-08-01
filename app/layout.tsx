import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aiheadshot.app";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: "Free AI Headshot Generator — Professional Portraits in Seconds",
        template: "%s | AI Headshot Generator",
    },
    description:
        "Generate a free professional AI headshot from any selfie. No signup, no payment, no watermark. Upload your photo and get a stunning corporate portrait in under 60 seconds.",
    keywords: [
        "free ai headshot generator",
        "ai headshot",
        "professional headshot generator",
        "ai portrait generator free",
        "linkedin headshot generator",
        "professional photo ai",
        "ai corporate headshot",
    ],
    openGraph: {
        title: "Free AI Headshot Generator — Professional Portraits in Seconds",
        description:
            "Upload your selfie and get a free AI professional headshot instantly. No signup required.",
        url: siteUrl,
        siteName: "AI Headshot Generator",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Free AI Headshot Generator",
        description:
            "Upload your selfie → get a professional AI headshot in 60 seconds. Free, no signup.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
    },
    alternates: {
        canonical: siteUrl,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="alternate" hrefLang="en-us" href={`${siteUrl}/`} />
                <link rel="alternate" hrefLang="en-gb" href={`${siteUrl}/`} />
                <link rel="alternate" hrefLang="en-ca" href={`${siteUrl}/`} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            url: siteUrl,
                            potentialAction: {
                                "@type": "SearchAction",
                                target: `${siteUrl}/search?q={search_term_string}`,
                                "query-input": "required name=search_term_string",
                            },
                        }),
                    }}
                />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className="font-sans bg-dark-900 text-slate-50 antialiased min-h-screen">
                {children}
                <Analytics />
            </body>
        </html>
    );
}
