'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  Bookmark, 
  Share2, 
  Calendar,
  MessageCircle,
  Info,
  ShoppingCart,
  ExternalLink,
  Star,
  Download,
  Crown,
  Check,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/content';

interface ProductOverlayProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductOverlay({ product, isOpen, onClose }: ProductOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!product) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto scrollbar-glass bg-white dark:bg-[var(--bg-secondary)] rounded-xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/70 dark:bg-[var(--bg-secondary)]/70 border-b border-[var(--border)] shadow-[0_6px_20px_rgba(0,0,0,0.08)] px-8 py-6">
              <div className="flex items-start justify-between gap-6">
                {/* Left: Title & Creator Info */}
                <div className="flex-1 min-w-0">
                  {/* Category Badge */}
                  <div className="inline-block px-3 py-1 text-xs font-medium rounded-full glass neon-border text-[var(--accent)] mb-3">
                    {product.category}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-3 leading-tight">
                    {product.title}
                  </h2>

                  {/* Creator Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)] mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs font-semibold text-[var(--accent)]">
                        FP
                      </div>
                      <span className="font-medium">Faizan Popatiya</span>
                    </div>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="text-[var(--accent)]">Available for work</span>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                    <a href="mailto:faizan.popatiya.work@gmail.com" className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">faizan.popatiya.work@gmail.com</span>
                    </a>
                    <a href="https://faizanpopatiya.com" className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
                      <Globe className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">faizanpopatiya.com</span>
                    </a>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-start gap-2">
                  {/* Action Buttons */}
                  <div className="hidden md:flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full glass hover:glass-strong hover:neon-border transition-all duration-200 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                    <button className="w-10 h-10 rounded-full glass hover:glass-strong hover:neon-border transition-all duration-200 flex items-center justify-center">
                      <Bookmark className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                    <button className="w-10 h-10 rounded-full glass hover:glass-strong hover:neon-border transition-all duration-200 flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-[var(--text-secondary)]" />
                    </button>
                  </div>

                  {/* CTA Button */}
                  <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-hover)] transition-all duration-200 neon-glow">
                    <ShoppingCart className="w-4 h-4" />
                    Get this ({`$${product.price}`})
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full glass hover:glass-strong hover:neon-border transition-all duration-200 flex items-center justify-center"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-[var(--text-secondary)]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative px-8 py-8">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                      {product.rating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{product.reviews || 0} reviews</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Download className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-lg font-bold text-[var(--text-primary)]">
                      {formatNumber(product.downloads || 0)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">downloads</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Version</p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{product.version || '1.0'}</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-[var(--text-muted)] mb-1">License</p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{product.license}</p>
                </div>
              </div>

              {/* Preview Image */}
              <div className="relative rounded-xl overflow-hidden bg-[var(--bg-tertiary)] mb-8">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto"
                  priority
                />
                {product.isPro && (
                  <div className="absolute top-4 right-4 px-4 py-2 rounded-full glass-strong neon-border flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-sm font-semibold text-[var(--accent)] neon-text">
                      PRO
                    </span>
                  </div>
                )}
              </div>

              {/* Vertical Toolbar (Desktop) */}
              <div className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+1rem)] flex-col gap-3">
                <button className="w-11 h-11 rounded-full bg-white dark:bg-[var(--bg-secondary)] border border-[var(--border)] shadow-lg hover:shadow-xl hover:border-[var(--accent)] transition-all duration-200 flex items-center justify-center relative">
                  <MessageCircle className="w-5 h-5 text-[var(--text-secondary)]" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center justify-center">
                    37
                  </span>
                </button>
                <button className="w-11 h-11 rounded-full bg-white dark:bg-[var(--bg-secondary)] border border-[var(--border)] shadow-lg hover:shadow-xl hover:border-[var(--accent)] transition-all duration-200 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
                <button className="w-11 h-11 rounded-full bg-white dark:bg-[var(--bg-secondary)] border border-[var(--border)] shadow-lg hover:shadow-xl hover:border-[var(--accent)] transition-all duration-200 flex items-center justify-center">
                  <Info className="w-5 h-5 text-[var(--text-secondary)]" />
                </button>
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                  About This Product
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {product.excerpt}
                </p>
              </div>

              {/* What's Included */}
              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Complete source code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Lifetime updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Documentation & examples</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Commercial license</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Priority support</span>
                  </li>
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3 text-[var(--text-muted)]">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-sm font-medium rounded-full glass hover:neon-border transition-all duration-200 text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-white rounded-xl font-semibold hover:bg-[var(--accent-hover)] transition-all duration-200 neon-border hover:neon-glow">
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Now (${product.price})
                </button>
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 glass-strong rounded-xl font-semibold hover:neon-border transition-all duration-200 text-[var(--text-primary)]"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
