'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  href,
  className,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn('group', className)}
    >
      <Link href={href} className="block">
        <div className="relative overflow-hidden rounded-2xl glass hover:glass-strong hover:neon-border transition-all duration-300 hover-lift hover-glow">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-[var(--bg-tertiary)]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] group-hover:neon-text transition-all duration-200">
                {title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200" />
            </div>
            
            <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium rounded-full glass text-[var(--text-secondary)] group-hover:neon-border transition-all duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
