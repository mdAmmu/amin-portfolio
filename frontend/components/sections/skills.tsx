'use client';

import { FadeInUp } from '@/components/animations/reveal';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Database, 
  Cpu, 
  Code2, 
  Network,
  TrendingUp,
  LucideIcon
} from 'lucide-react';
import { siteConfig } from '@/lib/config';

const experience = siteConfig.experience;

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Brain,
  Database,
  Cpu,
  Code2,
  Network,
};

const skillCategories = siteConfig.skills.map((skill) => ({
  ...skill,
  icon: iconMap[skill.icon] || Brain,
}));

export function Skills() {
  return (
    <SectionWrapper id="skills" className="bg-[var(--bg-secondary)]">
      <FadeInUp>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] mb-6">
            <TrendingUp className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              {siteConfig.sections.skills.badge}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4" style={{ letterSpacing: '-0.02em' }}>
            {siteConfig.sections.skills.title}
          </h2>
          
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {siteConfig.sections.skills.description}
          </p>
        </div>
      </FadeInUp>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Left: Experience Timeline */}
        <FadeInUp delay={0.1}>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-8 flex items-center gap-2">
              <div className="w-1 h-6 bg-[var(--accent)] rounded-full" />
              Professional Journey
            </h3>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative pl-8 pb-8 border-l-2 border-[var(--border)] last:border-l-0 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--accent)] border-4 border-[var(--bg-secondary)]" />

                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-[var(--text-primary)]">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-medium text-[var(--accent)]">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)] whitespace-nowrap">
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-1.5 mt-3">
                      {exp.highlights?.map((point, i) => (
                        <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                          <span className="text-[var(--accent)] mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Right: Skills Visualization */}
        <FadeInUp delay={0.2}>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-8 flex items-center gap-2">
              <div className="w-1 h-6 bg-[var(--accent)] rounded-full" />
              Technical Skills
            </h3>

            <div className="space-y-6">
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-[var(--shadow-medium)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-[var(--accent)]/10">
                        <Icon className="w-5 h-5 text-[var(--accent)]" />
                      </div>
                      <h4 className="text-base font-semibold text-[var(--text-primary)]">
                        {category.category}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeInUp>
      </div>
    </SectionWrapper>
  );
}
