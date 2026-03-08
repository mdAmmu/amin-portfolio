'use client';

import { motion } from 'framer-motion';

// 1. Define your component props interface
interface ComponentTemplateProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'primary' | 'secondary';
}

// 2. Create your component
export function ComponentTemplate({ 
  title = 'Component Title',
  description = 'Component description',
  variant = 'default'
}: ComponentTemplateProps) {
  const variants = {
    default: 'bg-[var(--bg-secondary)] text-[var(--text-primary)]',
    primary: 'bg-[var(--accent)] text-white',
    secondary: 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`
        rounded-xl p-6 
        border border-[var(--border)]
        shadow-[var(--shadow-soft)]
        hover:shadow-[var(--shadow-medium)]
        transition-all duration-300
        ${variants[variant]}
      `}
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </motion.div>
  );
}

// 3. Export component metadata (REQUIRED)
export const componentMetadata = {
  id: 'component-template',                    // Unique ID (kebab-case)
  name: 'Component Template',                  // Display name
  description: 'A template to create new playground components',
  category: 'layout' as const,                 // Choose: button, card, form, navigation, animation, layout, feedback, data-display
  tags: ['template', 'example', 'starter'],    // Searchable tags
  
  defaultProps: {
    title: 'Component Title',
    description: 'Component description',
    variant: 'default',
  },
  
  controls: [
    {
      name: 'title',
      type: 'text' as const,
      defaultValue: 'Component Title',
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text' as const,
      defaultValue: 'Component description',
      label: 'Description',
    },
    {
      name: 'variant',
      type: 'select' as const,
      options: ['default', 'primary', 'secondary'],
      defaultValue: 'default',
      label: 'Variant',
    },
  ],
  
  code: `<ComponentTemplate 
  title="Component Title"
  description="Component description"
  variant="default"
/>`,
};
