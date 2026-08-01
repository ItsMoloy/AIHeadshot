// next-seo configuration – global SEO defaults
// https://github.com/garmeeh/next-seo
export default {
    titleTemplate: "%s | AI Headshot Generator",
    defaultTitle: "Free AI Headshot Generator — Professional Portraits in Seconds",
    description:
        "Generate a free professional AI headshot from any selfie. No signup, no payment, no watermark. Upload your photo and get a stunning corporate portrait in under 60 seconds.",
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_SITE_URL,
        site_name: "AI Headshot Generator",
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "AI Headshot Generator",
            },
        ],
    },
    twitter: {
        handle: "@ai_headshot",
        site: "@ai_headshot",
        cardType: "summary_large_image",
    },
};
