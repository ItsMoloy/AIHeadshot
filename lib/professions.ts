// lib/professions.ts
// Central registry of all supported professions for programmatic SEO pages

export interface ProfessionConfig {
    slug: string;
    label: string;
    prompt: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    h1: string;
}

export const professions: ProfessionConfig[] = [
    {
        slug: "doctor",
        label: "Doctor",
        prompt:
            "professional doctor, white lab coat, stethoscope around neck, clean hospital background, soft lighting, confident smile, 4k portrait",
        description: "Perfect for medical professionals, hospital staff, and healthcare workers.",
        metaTitle: "Free AI Doctor Headshot Generator — Professional Medical Portrait",
        metaDescription:
            "Generate a free AI doctor headshot in seconds. Upload your selfie and get a professional medical portrait with white coat, hospital background, and perfect lighting.",
        h1: "Free AI Headshot Generator for Doctors",
    },
    {
        slug: "lawyer",
        label: "Lawyer",
        prompt:
            "professional lawyer, sharp navy blue suit, law library background, authoritative pose, confident expression, soft studio lighting, 4k portrait",
        description: "Ideal for attorneys, paralegals, and legal professionals.",
        metaTitle: "Free AI Lawyer Headshot Generator — Professional Legal Portrait",
        metaDescription:
            "Generate a free AI lawyer headshot instantly. Upload your selfie and get a professional legal portrait with suit, law library background, and confident expression.",
        h1: "Free AI Headshot Generator for Lawyers",
    },
    {
        slug: "engineer",
        label: "Engineer",
        prompt:
            "professional software engineer, smart casual attire, modern tech office background, friendly smile, approachable expression, soft studio lighting, 4k portrait",
        description: "Great for software engineers, developers, and tech professionals.",
        metaTitle: "Free AI Engineer Headshot Generator — Tech Professional Portrait",
        metaDescription:
            "Create a free AI headshot for engineers in seconds. Upload your selfie and get a professional tech portrait with modern office background and perfect lighting.",
        h1: "Free AI Headshot Generator for Engineers",
    },
    {
        slug: "ceo",
        label: "CEO",
        prompt:
            "executive CEO portrait, premium dark suit, minimalist corporate background, powerful confident expression, professional studio lighting, 4k portrait",
        description: "Crafted for executives, founders, and C-suite professionals.",
        metaTitle: "Free AI CEO Headshot Generator — Executive Portrait",
        metaDescription:
            "Generate a free AI CEO headshot in seconds. Upload your selfie and get a premium executive portrait with dark suit, corporate background, and confident expression.",
        h1: "Free AI Headshot Generator for CEOs",
    },
    {
        slug: "nurse",
        label: "Nurse",
        prompt:
            "professional nurse, blue scrubs, clean hospital background, warm caring smile, compassionate expression, soft natural lighting, 4k portrait",
        description: "Tailored for nurses, medical assistants, and healthcare workers.",
        metaTitle: "Free AI Nurse Headshot Generator — Healthcare Professional Portrait",
        metaDescription:
            "Create a free AI nurse headshot instantly. Upload your selfie and get a professional healthcare portrait with scrubs, hospital background, and warm expression.",
        h1: "Free AI Headshot Generator for Nurses",
    },
    {
        slug: "teacher",
        label: "Teacher",
        prompt:
            "professional teacher, smart business casual attire, classroom background with bookshelves, warm approachable smile, soft diffused lighting, 4k portrait",
        description: "Perfect for teachers, professors, and education professionals.",
        metaTitle: "Free AI Teacher Headshot Generator — Education Professional Portrait",
        metaDescription:
            "Generate a free AI teacher headshot in seconds. Upload your selfie and get a professional education portrait with classroom background and warm expression.",
        h1: "Free AI Headshot Generator for Teachers",
    },
    {
        slug: "architect",
        label: "Architect",
        prompt:
            "professional architect, modern business attire, architectural blueprints background, creative confident expression, natural studio lighting, 4k portrait",
        description: "Ideal for architects, designers, and urban planners.",
        metaTitle: "Free AI Architect Headshot Generator — Professional Design Portrait",
        metaDescription:
            "Create a free AI architect headshot instantly. Upload your selfie and get a professional design portrait with architectural background and confident expression.",
        h1: "Free AI Headshot Generator for Architects",
    },
    {
        slug: "real-estate-agent",
        label: "Real Estate Agent",
        prompt:
            "professional real estate agent, business formal attire, modern office or upscale home background, trustworthy confident smile, warm studio lighting, 4k portrait",
        description: "Great for real estate agents, brokers, and property managers.",
        metaTitle: "Free AI Real Estate Agent Headshot Generator — Professional Portrait",
        metaDescription:
            "Generate a free AI headshot for real estate agents instantly. Upload your selfie and get a professional portrait with upscale background and confident expression.",
        h1: "Free AI Headshot Generator for Real Estate Agents",
    },
    {
        slug: "accountant",
        label: "Accountant",
        prompt:
            "professional accountant, formal business suit, clean corporate office background, trustworthy reliable expression, soft professional lighting, 4k portrait",
        description: "Suited for accountants, CPAs, and financial professionals.",
        metaTitle: "Free AI Accountant Headshot Generator — Finance Professional Portrait",
        metaDescription:
            "Create a free AI accountant headshot in seconds. Upload your selfie and get a professional finance portrait with corporate background and trustworthy expression.",
        h1: "Free AI Headshot Generator for Accountants",
    },
    {
        slug: "freelancer",
        label: "Freelancer",
        prompt:
            "professional freelancer, stylish smart casual clothing, modern home office or co-working space background, creative confident smile, natural warm lighting, 4k portrait",
        description: "Perfect for freelancers, consultants, and independent professionals.",
        metaTitle: "Free AI Freelancer Headshot Generator — Professional Profile Photo",
        metaDescription:
            "Generate a free AI headshot for freelancers instantly. Upload your selfie and get a professional portrait perfect for LinkedIn, Upwork, or Fiverr profiles.",
        h1: "Free AI Headshot Generator for Freelancers",
    },
];

export function getProfessionBySlug(slug: string): ProfessionConfig | undefined {
    return professions.find((p) => p.slug === slug);
}

export const DEFAULT_PROMPT =
    "professional corporate headshot, business suit, clean office background, soft studio lighting, confident smile, 4k portrait";
