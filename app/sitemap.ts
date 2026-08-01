import { MetadataRoute } from "next";
import { professions } from "@/lib/professions";

export default function sitemap(): MetadataRoute.Sitemap {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aiheadshot.app";
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
    ];

    const professionPages: MetadataRoute.Sitemap = professions.map((p) => ({
        url: `${siteUrl}/headshot/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [...staticPages, ...professionPages];
}
