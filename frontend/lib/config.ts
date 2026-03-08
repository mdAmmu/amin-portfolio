/**
 * Site Configuration
 * 
 * Central configuration file for all site content and settings.
 * Update these values to customize your portfolio site.
 */

export const siteConfig = {
  // Personal Information
  personal: {
    name: 'Faizan Popatiya',
    firstName: 'Faizan',
    lastName: 'Popatiya',
    title: 'AI/ML Engineer',
    tagline: 'Building Intelligent AI Solutions',
    shortBio: 'AI/ML Engineer specializing in GenAI, LLMs, and production-grade machine learning systems. Transforming complex data into intelligent solutions.',
    longBio: "I'm an AI/ML Engineer with 3+ years of specialized experience in Python development, Large Language Models, and GenAI applications. I build production-grade AI systems that solve real business problems.",
    extendedBio: "From fine-tuning LLMs to building RAG systems and deploying ML pipelines at scale, I focus on creating reliable, accurate AI solutions that deliver measurable impact.",
    yearsExperience: '3+',
    avatar: '/avatar.svg',
  },

  // Contact Information
  contact: {
    email: 'faizan.popatiya.work@gmail.com',
    location: 'Hyderabad', // Optional
    resume: '/resume.pdf', // Path to resume file in public folder
  },

  // Social Media Links
  social: {
    github: 'https://github.com/fayzan9',
    linkedin: 'https://www.linkedin.com/in/faizan-popatiya-452980250/',
    twitter: 'https://twitter.com/yourhandle',
    leetcode: 'https://leetcode.com/u/fayzanpopatiya/',
    // Add more as needed
  },

  // Work Status
  availability: {
    isAvailable: true,
    statusText: 'Available for Work',
    unavailableText: 'Currently Unavailable', // Fallback text
  },

  // Experience Timeline (for About and Skills pages)
  experience: [
    {
      year: '2024',
      role: 'Senior AI/ML Engineer',
      company: 'AI Startup',
      duration: '2023 - Present',
      description: 'Leading development of production LLM applications and RAG systems serving 1M+ queries monthly',
      highlights: [
        'Leading development of production LLM applications',
        'Built RAG systems serving 1M+ queries monthly',
        'Improved model performance by 40%',
      ],
    },
    {
      year: '2023',
      role: 'ML Engineer',
      company: 'Healthcare Tech',
      duration: '2022 - 2023',
      description: 'Built and deployed custom fine-tuned medical LLMs with 95% accuracy on clinical tasks',
      highlights: [
        'Fine-tuned medical LLMs with 95% accuracy',
        'Deployed models for clinical decision support',
        'Reduced inference time by 60%',
      ],
    },
    {
      year: '2022',
      role: 'Data Scientist',
      company: 'Enterprise SaaS',
      duration: '2021 - 2022',
      description: 'Developed ML pipelines for real-time sentiment analysis processing 50M+ posts daily',
      highlights: [
        'Built ML pipelines for sentiment analysis',
        'Processed 50M+ posts daily',
        'Improved prediction accuracy by 30%',
      ],
    },
    {
      year: '2021',
      role: 'Computer Science & AI',
      company: 'University',
      duration: '2017 - 2021',
      description: 'Specialized in Machine Learning, Deep Learning, and Natural Language Processing',
      highlights: [],
    },
  ],

  // Technical Skills
  skills: [
    {
      category: 'AI & LLMs',
      icon: 'Brain',
      skills: ['GPT', 'Claude', 'Llama', 'Fine-tuning', 'RAG', 'Prompt Engineering'],
    },
    {
      category: 'ML Frameworks',
      icon: 'Cpu',
      skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'scikit-learn'],
    },
    {
      category: 'Development',
      icon: 'Code2',
      skills: ['Python', 'FastAPI', 'Django', 'TypeScript', 'Next.js', 'Docker'],
    },
    {
      category: 'Data & Vectors',
      icon: 'Database',
      skills: ['Pinecone', 'Weaviate', 'ChromaDB', 'PostgreSQL', 'Redis'],
    },
    {
      category: 'Cloud & Ops',
      icon: 'Network',
      skills: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'CI/CD', 'MLOps'],
    },
  ],

  // Site Metadata
  metadata: {
    title: 'AI/ML Engineer Portfolio',
    description: 'Portfolio of an AI/ML Engineer specializing in GenAI, LLMs, and production-grade machine learning systems.',
    siteUrl: 'https://faizanpopatiya.com',
    ogImage: '/og-image.png', // Default Open Graph image
  },

  // Content Settings
  content: {
    featuredProjectsCount: 3,
    blogPreviewCount: 3,
  },

  // CTA Section
  cta: {
    heading: "Let's Work Together",
    description: "Have a project in mind? Let's discuss how we can create something amazing together.",
    primaryButtonText: 'Start a Conversation',
    secondaryButtonText: 'Send Email',
  },

  // Navigation
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],

  // Featured Projects Section
  sections: {
    featuredProjects: {
      title: 'Featured Projects',
      description: 'A selection of my recent work showcasing expertise in modern web development',
    },
    skills: {
      title: 'AI & ML Expertise',
      description: 'Specialized in cutting-edge AI technologies, from LLMs to production ML systems',
      badge: 'Skills & Experience',
    },
    blog: {
      title: 'Latest from the Blog',
      description: 'Thoughts on AI/ML, software development, and technology',
    },
  },
} as const;

// Type-safe config access
export type SiteConfig = typeof siteConfig;
