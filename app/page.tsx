import type { Metadata } from "next";
import HeadshotGenerator from "@/components/HeadshotGenerator";
import Link from "next/link";
import { professions } from "@/lib/professions";

export const metadata: Metadata = {
    title: "Free AI Headshot Generator — Professional Portraits in Seconds",
    description:
        "Generate a free professional AI headshot from any selfie in under 60 seconds. No signup, no payment required. Perfect for LinkedIn, resumes, and business profiles.",
    alternates: {
        canonical: "/",
    },
};

const features = [
    {
        icon: "⚡",
        title: "Ready in 60 Seconds",
        description: "Our AI generates a stunning professional headshot in under a minute.",
    },
    {
        icon: "🔒",
        title: "100% Free & Private",
        description: "No account, no credit card. Your photo is never stored permanently.",
    },
    {
        icon: "🎨",
        title: "Custom Styles",
        description: "Choose your profession, background, attire, and lighting with a simple prompt.",
    },
    {
        icon: "📥",
        title: "Instant Download",
        description: "Download your headshot in high-resolution with one click. No watermarks.",
    },
];

const stats = [
    { value: "500K+", label: "Headshots Generated" },
    { value: "4.9★", label: "Average Rating" },
    { value: "100%", label: "Free Forever" },
    { value: "60s", label: "Average Generation Time" },
];

export default function HomePage() {
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

                    <div className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
                        <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
                        <Link href="#professions" className="hover:text-white transition-colors">Professions</Link>
                        <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
                    </div>

                    <a
                        href="#generator"
                        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25"
                    >
                        Try Free →
                    </a>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
                <div className="inline-flex items-center gap-2 bg-brand-950/60 border border-brand-700/30 text-brand-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Free AI Headshot Generator — No Signup Required
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                    Turn Any Selfie Into a{" "}
                    <span className="gradient-text">Professional Headshot</span>{" "}
                    — Instantly
                </h1>

                <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                    Upload your photo, choose your style, and our AI generates a stunning
                    professional portrait in under 60 seconds. Free, no account needed.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass rounded-xl px-4 py-3">
                            <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* ── GENERATOR WIDGET ── */}
                <div id="generator" className="glass rounded-3xl border border-white/8 p-6 sm:p-8 glow-brand">
                    <HeadshotGenerator />
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Three simple steps to your professional AI headshot.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        { step: "01", title: "Upload Your Selfie", desc: "Drag and drop or browse any JPEG/PNG selfie. A well-lit, front-facing photo gives the best results.", icon: "📸" },
                        { step: "02", title: "Choose Your Style", desc: "Pick a quick preset or write a custom prompt describing your profession, background, and attire.", icon: "🎨" },
                        { step: "03", title: "Download & Share", desc: "Your AI headshot is ready in ~60 seconds. Download it in high-res and use it anywhere — LinkedIn, resume, email.", icon: "✨" },
                    ].map((item) => (
                        <div key={item.step} className="relative glass rounded-2xl p-6 border border-white/6 hover:border-brand-500/30 transition-all duration-300 group">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <div className="absolute top-4 right-4 text-4xl font-black text-dark-600 group-hover:text-dark-500 transition-colors">
                                {item.step}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((f) => (
                        <div key={f.title} className="glass rounded-2xl p-5 border border-white/6 hover:border-brand-500/20 transition-all duration-300">
                            <div className="text-2xl mb-3">{f.icon}</div>
                            <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                            <p className="text-slate-400 text-xs leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── PROFESSION PAGES ── */}
            <section id="professions" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Optimized for Your Profession
                    </h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        We have pre-built styles tailored for every profession. Click your role
                        for the perfect headshot prompt.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {professions.map((p) => (
                        <Link
                            key={p.slug}
                            href={`/headshot/${p.slug}`}
                            className="
                glass rounded-xl p-4 text-center border border-white/6
                hover:border-brand-500/40 hover:bg-brand-950/30
                transition-all duration-200 group
              "
                        >
                            <p className="text-sm font-semibold text-slate-300 group-hover:text-brand-300 transition-colors">
                                {p.label}
                            </p>
                            <p className="text-xs text-slate-500 mt-1 group-hover:text-slate-400 transition-colors">
                                View page →
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            q: "Is the AI headshot generator really free?",
                            a: "Yes! You can generate professional AI headshots completely free with no account, no subscription, and no watermarks. We support ourselves through optional premium features and non-intrusive advertising.",
                        },
                        {
                            q: "How accurate are the results?",
                            a: "Our AI uses PhotoMaker, a state-of-the-art identity-preserving model from Tencent ARC, trained on millions of portraits. Results closely resemble your face while applying professional styling. Results vary by photo quality — a clear, well-lit selfie produces the best output.",
                        },
                        {
                            q: "Is my photo stored or sold?",
                            a: "No. Your photo is temporarily hosted to send to the AI model, then automatically deleted after 10 minutes. We never store, use, or sell your images.",
                        },
                        {
                            q: "What makes a good input photo?",
                            a: "Use a front-facing photo with good lighting, a clear view of your face, and minimal background clutter. Natural daylight or even indoor lighting works great. Avoid sunglasses or heavy filters.",
                        },
                        {
                            q: "Can I use the headshot commercially?",
                            a: "Yes, you own your generated headshots and can use them for LinkedIn, resumes, business websites, or any professional purpose.",
                        },
                        {
                            q: "How long does generation take?",
                            a: "Usually between 30 and 90 seconds depending on server load. The AI model runs in the cloud and processes your portrait in a high-powered GPU environment.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="glass border border-white/6 rounded-xl p-5 hover:border-brand-500/20 transition-all duration-200">
                            <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="border-t border-white/5 glass py-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-slate-400">
                            AIHeadshot — Free forever.
                        </span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                        {professions.slice(0, 5).map((p) => (
                            <Link key={p.slug} href={`/headshot/${p.slug}`} className="hover:text-slate-300 transition-colors">
                                {p.label} Headshot
                            </Link>
                        ))}
                    </div>

                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} AI Headshot Generator
                    </p>
                </div>
            </footer>
        </main>
    );
}
