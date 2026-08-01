import Link from "next/link";

export default function NotFound() {
    return (
        <main className="hero-gradient min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <div className="text-6xl font-black gradient-text mb-4">404</div>
            <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
            <p className="text-slate-400 mb-8 max-w-sm">
                The profession or page you&apos;re looking for doesn&apos;t exist yet.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
            >
                ← Back to Generator
            </Link>
        </main>
    );
}
