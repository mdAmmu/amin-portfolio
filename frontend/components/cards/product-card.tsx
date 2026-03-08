'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Download, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  title: string;
  excerpt: string;
  price: number;
  category: string;
  image: string;
  tags: string[];
  rating?: number;
  reviews?: number;
  downloads?: number;
  isPro?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ProductCard({
  title,
  excerpt,
  price,
  category,
  image,
  tags,
  rating = 0,
  reviews = 0,
  downloads = 0,
  isPro = false,
  className,
  onClick,
}: ProductCardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn('group cursor-pointer', className)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl glass hover:glass-strong hover:neon-border transition-all duration-300 hover-lift hover-glow h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-[var(--bg-tertiary)]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Pro Badge */}
            {isPro && (
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass-strong neon-border flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--accent)] neon-text">
                  PRO
                </span>
              </div>
            )}

            {/* Category Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full glass-strong text-[var(--text-primary)]">
              {category}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] group-hover:neon-text transition-all duration-200">
                {title}
              </h3>
              
              <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
                {excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-full glass text-[var(--text-secondary)] group-hover:neon-border transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[var(--border)] space-y-3">
              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                {rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                    <span className="font-medium">{rating.toFixed(1)}</span>
                    <span>({reviews})</span>
                  </div>
                )}
                {downloads > 0 && (
                  <div className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    <span>{formatNumber(downloads)}</span>
                  </div>
                )}
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[var(--accent)] group-hover:neon-text">
                    ${price}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong neon-border text-sm font-medium text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle purchase logic
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
}
