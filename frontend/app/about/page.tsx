import { Metadata } from 'next';
import Image from 'next/image';
import { FadeInUp } from '@/components/animations/reveal';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Brain, Cpu, Database, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About - AI/ML Engineer',
  description: 'Learn about my experience in AI/ML engineering, from building LLM applications to deploying production ML systems.',
};

const timeline = [
  {
    year: '2024',
    title: 'Senior AI/ML Engineer',
    company: 'AI Startup',
    description: 'Leading development of production LLM applications and RAG systems serving 1M+ queries monthly',
  },
  {
    year: '2023',
    title: 'ML Engineer',
    company: 'Healthcare Tech',
    description: 'Built and deployed custom fine-tuned medical LLMs with 95% accuracy on clinical tasks',
  },
  {
    year: '2022',
    title: 'Data Scientist',
    company: 'Enterprise SaaS',
    description: 'Developed ML pipelines for real-time sentiment analysis processing 50M+ posts daily',
  },
  {
    year: '2021',
    title: 'Computer Science & AI',
    company: 'University',
    description: 'Specialized in Machine Learning, Deep Learning, and Natural Language Processing',
  },
];

const values = [
  {
    icon: Brain,
    title: 'AI Innovation',
    description: 'Pushing boundaries with cutting-edge LLMs and GenAI technologies',
  },
  {
    icon: Cpu,
    title: 'Production ML',
    description: 'Building scalable, reliable ML systems that deliver real business value',
  },
  {
    icon: Database,
    title: 'Data Quality',
    description: 'Ensuring high-quality training data and robust evaluation frameworks',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing ML models for speed, cost, and accuracy in production',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-tertiary)]">
                <Image
                  src="/avatar.svg"
                  alt="Profile"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Intro */}
              <div>
                <h1 className="mb-6">About Me</h1>
                <p className="text-xl text-[var(--text-secondary)] mb-6">
                  I'm an AI/ML Engineer with 3+ years of specialized experience in
                  Python development, Large Language Models, and GenAI applications.
                  I build production-grade AI systems that solve real business problems.
                </p>
                <p className="text-lg text-[var(--text-secondary)]">
                  From fine-tuning LLMs to building RAG systems and deploying ML pipelines
                  at scale, I focus on creating reliable, accurate AI solutions that
                  deliver measurable impact.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </SectionWrapper>

      {/* Values */}
      <SectionWrapper variant="secondary">
        <FadeInUp>
          <div className="text-center mb-12">
            <h2 className="mb-4">What I Value</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Principles that guide my work and decision-making
            </p>
          </div>
        </FadeInUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <FadeInUp key={value.title} delay={index * 0.1}>
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-[var(--text-secondary)]">{value.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <FadeInUp>
          <div className="text-center mb-12">
            <h2 className="mb-4">My Journey</h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Professional experience and education
            </p>
          </div>
        </FadeInUp>

        <div className="max-w-3xl mx-auto">
          {timeline.map((item, index) => (
            <FadeInUp key={index} delay={index * 0.1}>
              <div className="relative pl-8 pb-12 border-l-2 border-[var(--border)] last:pb-0">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--bg-primary)]" />
                <div className="mb-1 text-sm font-medium text-[var(--accent)]">
                  {item.year}
                </div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <div className="text-[var(--text-muted)] mb-2">{item.company}</div>
                <p className="text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
