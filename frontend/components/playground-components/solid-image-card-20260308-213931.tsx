'use client';

import { motion } from 'framer-motion';

interface SolidImageCardProps {
  imageColor?: string;
  title?: string;
  description?: string;
  meta?: string;
  slideFrom?: 'left' | 'right' | 'bottom';
  hoverScale?: number;
}

export function SolidImageCard({
  imageColor = 'var(--accent)',
  title = 'Card Title',
  description = 'This is a brief description for the card content.',
  meta = 'Meta Information',
  slideFrom = 'bottom',
  hoverScale = 1.05,
}: SolidImageCardProps) {
  const slideVariants = {
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
    bottom: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  };

  const { initial, animate } = slideVariants[slideFrom];

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: hoverScale }}
      className="max-w-sm w-full rounded-xl overflow-hidden shadow-[var(--shadow-medium)] border border-[var(--border)] bg-[var(--bg-primary)] cursor-pointer select-none relative flex flex-col sm:flex-row"
      style={{ color: 'var(--text-primary)' }}
    >
      <motion.div
        className="flex-shrink-0 w-full h-48 sm:h-auto sm:w-40 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
        style={{ backgroundColor: imageColor, boxShadow: 'var(--shadow-soft)' }}
        aria-label="Solid color image placeholder"
      />
      <div className="p-4 flex flex-col justify-between flex-1 bg-[var(--bg-secondary)]">
        <div>
          <h2 className="text-lg font-semibold mb-1 text-[var(--text-primary)] truncate">{title}</h2>
          <p className="text-[var(--text-muted)] text-sm line-clamp-3 mb-2">{description}</p>
        </div>
        <p className="text-xs font-medium text-[var(--accent-light)] mt-auto">{meta}</p>
      </div>
    </motion.div>
  );
}

export const componentMetadata = {
  id: 'solid-image-card',
  name: 'Solid Image Card',
  description: 'Card with a solid color image block, meta data, and smooth hover and slide-in animations',
  category: 'card' as const,
  tags: ['card', 'animated', 'image', 'hover', 'slide', 'responsive'],
  defaultProps: {
    imageColor: 'var(--accent)',
    title: 'Card Title',
    description: 'This is a brief description for the card content.',
    meta: 'Meta Information',
    slideFrom: 'bottom',
    hoverScale: 1.05,
  },
  controls: [
    {
      name: 'imageColor',
      type: 'color' as const,
      defaultValue: 'var(--accent)',
      label: 'Image Color',
    },
    {
      name: 'title',
      type: 'text' as const,
      defaultValue: 'Card Title',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text' as const,
      defaultValue: 'This is a brief description for the card content.',
      label: 'Description',
    },
    {
      name: 'meta',
      type: 'text' as const,
      defaultValue: 'Meta Information',
      label: 'Meta Information',
    },
    {
      name: 'slideFrom',
      type: 'select' as const,
      options: ['left', 'right', 'bottom'],
      defaultValue: 'bottom',
      label: 'Slide From',
    },
    {
      name: 'hoverScale',
      type: 'number' as const,
      defaultValue: 1.05,
      label: 'Hover Scale',
    },
  ],
  code: `<SolidImageCard 
  imageColor="var(--accent)" 
  title="Card Title" 
  description="This is a brief description for the card content." 
  meta="Meta Information" 
  slideFrom="bottom" 
  hoverScale={1.05} 
/>`,
};