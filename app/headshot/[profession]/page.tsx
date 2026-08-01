import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import HeadshotGenerator from "@/components/HeadshotGenerator";
import { getProfessionBySlug, professions } from "@/lib/professions";

// Pre-generate all profession routes at build time
export async function generateStaticParams() {
    return professions.map((p) => ({ profession: p.slug }));
}

// Dynamic SEO metadata per profession
export async function generateMetadata({
    params,
}: {
    params: Promise<{ profession: string }>;
}): Promise<Metadata> {
    const { profession: slug } = await params;
    const config = getProfessionBySlug(slug);

    if (!config) {
        return { title: "Not Found" };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aiheadshot.app";

    return {
        title: config.metaTitle,
        description: config.metaDescription,
        keywords: [
            `free ai headshot for ${config.label.toLowerCase()}`,
            `ai ${config.label.toLowerCase()} headshot generator`,
            `professional ${config.label.toLowerCase()} headshot`,
            `${config.label.toLowerCase()} profile photo generator`,
            `ai portrait ${config.label.toLowerCase()}`,
        ],
        openGraph: {
            title: config.metaTitle,
            description: config.metaDescription,
            url: `${siteUrl}/headshot/${slug}`,
            siteName: "AI Headshot Generator",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: config.metaTitle,
            description: config.metaDescription,
        },
        alternates: {
            canonical: `/headshot/${slug}`,
        },
    };
}

export default async function ProfessionPage({
    params,
}: {
    params: Promise<{ profession: string }>;
}) {
    const { profession: slug } = await params;
    const config = getProfessionBySlug(slug);

    if (!config) {
        notFound();
    }

    // Related professions (exclude current)
    const relatedProfessions = professions.filter((p) => p.slug !== slug).slice(0, 6);

    return (
        <main className="hero-gradient min-h-screen">
            {/* ── NAV ── */}
            <nav className="sticky top-0 z-50 border-b border-white/5 glass">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg text-white">
                            AI<span className="gradient-text">Headshot</span>
                        </span>
                    </Link>

                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </nav>

            {/* ── BREADCRUMB ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
                <nav className="flex items-center gap-2 text-xs text-slate-500" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/#professions" className="hover:text-slate-300 transition-colors">Professions</Link>
                    <span>/</span>
                    <span className="text-slate-300">{config.label}</span>
                </nav>
            </div>

            {/* ── HERO ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 text-center">
                <div className="inline-flex items-center gap-2 bg-brand-950/60 border border-brand-700/30 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Optimized for {config.label}s
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                    {config.h1}
                </h1>

                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    {config.description} Upload your selfie and get a stunning AI-generated
                    professional portrait in under 60 seconds — completely free.
                </p>

                {/* ── GENERATOR WIDGET ── */}
                <div className="glass rounded-3xl border border-white/8 p-6 sm:p-8 glow-brand">
                    <HeadshotGenerator
                        defaultPrompt={config.prompt}
                        professionLabel={config.label}
                    />
                </div>
            </section>

            {/* ── PROFESSION CONTENT ── */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
                    Why {config.label}s Need a Great Headshot
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    {[
                        {
                            title: "First Impressions",
                            desc: `Your headshot is the first thing clients, patients, or colleagues see. A professional ${config.label.toLowerCase()} headshot communicates competence and trust before you say a word.`,
                        },
                        {
                            title: "LinkedIn & Online Profiles",
                            desc: `Profiles with professional photos get ${config.label === "Doctor" || config.label === "Lawyer" ? "10x" : "7x"} more views. Our AI headshot is perfect for LinkedIn, firm bios, and healthcare directories.`,
                        },
                        {
                            title: "Business Cards & Marketing",
                            desc: `Use your AI headshot on business cards, email signatures, professional websites, and marketing materials to build a consistent personal brand.`,
                        },
                    ].map((item) => (
                        <div key={item.title} className="glass rounded-xl p-5 border border-white/6">
                            <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── RELATED PROFESSIONS ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <h2 className="text-xl font-bold text-white mb-5 text-center">
                    More AI Headshot Styles
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {relatedProfessions.map((p) => (
                        <Link
                            key={p.slug}
                            href={`/headshot/${p.slug}`}
                            className="
                glass rounded-xl p-3 text-center border border-white/6
                hover:border-brand-500/40 hover:bg-brand-950/30
                transition-all duration-200
              "
                        >
                            <p className="text-sm font-medium text-slate-300 hover:text-brand-300 transition-colors">
                                {p.label}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-white/5 glass mt-20 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <Link href="/" className="text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                        ← Back to Free AI Headshot Generator
                    </Link>
                    <p className="text-xs text-slate-600 mt-4">
                        © {new Date().getFullYear()} AI Headshot Generator — Free, no signup required
                    </p>
                </div>
            </footer>
        </main>
    );
}
