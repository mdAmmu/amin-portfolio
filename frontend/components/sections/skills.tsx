'use client';

import { FadeInUp } from '@/components/animations/reveal';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { 
  Brain, 
  Database, 
  Cpu, 
  Code2, 
  Sparkles, 
  Network 
} from 'lucide-react';

const skills = [
  {
    icon: Brain,
    title: 'Large Language Models',
    description: 'Fine-tuning, prompt engineering, and deploying GPT, Claude, Llama models',
  },
  {
    icon: Sparkles,
    title: 'Generative AI',
    description: 'Building RAG systems, chatbots, and AI-powered applications',
  },
  {
    icon: Code2,
    title: 'Python Development',
    description: 'Expert in Python, FastAPI, Django, and ML frameworks like PyTorch & TensorFlow',
  },
  {
    icon: Database,
    title: 'Vector Databases',
    description: 'Working with Pinecone, Weaviate, ChromaDB for semantic search & embeddings',
  },
  {
    icon: Cpu,
    title: 'ML Engineering',
    description: 'Model training, optimization, deployment, and MLOps best practices',
  },
  {
    icon: Network,
    title: 'AI Infrastructure',
    description: 'Building scalable AI systems with AWS, Azure, and containerization',
  },
];

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <FadeInUp>
        <div className="text-center mb-16">
          <h2 className="mb-4">AI & ML Expertise</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Specialized in cutting-edge AI technologies, from LLMs to production ML systems
          </p>
        </div>
      </FadeInUp>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <FadeInUp key={skill.title} delay={index * 0.1}>
            <div className="p-6 rounded-2xl glass hover:glass-strong hover:neon-border transition-all duration-300 hover-lift group">
              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4 group-hover:neon-glow transition-all duration-300">
                <skill.icon className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[var(--text-primary)] group-hover:neon-text transition-all duration-300">
                {skill.title}
              </h3>
              <p className="text-[var(--text-secondary)]">
                {skill.description}
              </p>
            </div>
          </FadeInUp>
        ))}
      </div>
    </SectionWrapper>
  );
}
