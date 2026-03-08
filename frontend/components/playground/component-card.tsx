'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PlaygroundComponent } from '@/types';

interface ComponentCardProps {
  component: PlaygroundComponent;
  onClick: () => void;
  isHighlighted?: boolean;
}

export function ComponentCard({ component, onClick, isHighlighted = false }: ComponentCardProps) {
  const Component = component.component;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`
        group relative bg-[var(--bg-primary)] rounded-xl 
        border-2 ${isHighlighted ? 'border-[var(--accent)] shadow-[0_0_20px_var(--accent)]/20' : 'border-[var(--border)]'}
        overflow-hidden shadow-[var(--shadow-soft)] 
        hover:shadow-[var(--shadow-strong)] transition-all duration-300 
        cursor-pointer
      `}
    >
      {/* Preview Thumbnail */}
      <div className="aspect-video bg-[var(--bg-tertiary)] p-6 flex items-center justify-center overflow-hidden relative">
        <div className="scale-75 pointer-events-none">
          <Component {...component.defaultProps} />
        </div>
        
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
            {component.name}
          </h3>
          
          {/* Click Indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight className="w-5 h-5 text-[var(--accent)]" />
          </div>
        </div>
        
        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
          {component.description}
        </p>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]">
            {component.category}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {component.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-xs font-medium bg-[var(--accent-light)] text-[var(--accent)]"
            >
              {tag}
            </span>
          ))}
          {component.tags.length > 3 && (
            <span className="px-2 py-1 rounded text-xs font-medium text-[var(--text-muted)]">
              +{component.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />
      
      {/* Highlighted Ring Effect */}
      {isHighlighted && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-xl border-2 border-[var(--accent)] pointer-events-none"
        />
      )}
    </motion.div>
  );
}
