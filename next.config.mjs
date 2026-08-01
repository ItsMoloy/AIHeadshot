/**
 * Next.js configuration – enables remote image domains for AI‑generated headshots.
 */
export default {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "i.ibb.co" },
            { protocol: "https", hostname: "pbxt.replicate.delivery" },
            { protocol: "https", hostname: "replicate.delivery" },
            { protocol: "https", hostname: "*.replicate.delivery" },
        ],
    },
};
