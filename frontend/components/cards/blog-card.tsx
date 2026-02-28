'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  href: string;
  className?: string;
}

export function BlogCard({
  title,
  excerpt,
  date,
  readingTime,
  category,
  href,
  className,
}: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn('group', className)}
    >
      <Link href={href} className="block">
        <article className="p-6 rounded-2xl glass hover:glass-strong hover:neon-border transition-all duration-300 hover-lift">
          {/* Category */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full glass neon-border text-[var(--accent)]">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] group-hover:neon-text transition-all duration-200">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
            {excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
