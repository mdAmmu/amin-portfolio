'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Metadata } from 'next';
import { AIChatInterface } from '@/components/playground/ai-chat-interface';
import { ComponentCard } from '@/components/playground/component-card';
import { ComponentViewer } from '@/components/playground/component-viewer';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { usePlaygroundComponents } from '@/lib/dynamic-component-loader';
import { PlaygroundComponent } from '@/types';
import { Loader2 } from 'lucide-react';

export default function PlaygroundPage() {
  const [selectedComponent, setSelectedComponent] = useState<PlaygroundComponent | null>(null);
  const [highlightedComponents, setHighlightedComponents] = useState<string[]>([]);
  const [newComponentNotification, setNewComponentNotification] = useState<string | null>(null);
  const galleryRef = useRef<HTMLElement>(null);
  
  // Use dynamic component loader
  const { components, loading, error, reload } = usePlaygroundComponents();

  const handleComponentClick = (component: PlaygroundComponent) => {
    setSelectedComponent(component);
    // Smooth scroll to viewer
    setTimeout(() => {
      document.getElementById('component-viewer')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleCloseViewer = () => {
    setSelectedComponent(null);
    // Scroll back to gallery
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const handleComponentSuggestion = (componentIds: string[]) => {
    setHighlightedComponents(componentIds);
    // Scroll to gallery
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 500);

    // Clear highlights after 5 seconds
    setTimeout(() => {
      setHighlightedComponents([]);
    }, 5000);
  };

  const handleComponentGenerated = (filename: string) => {
    setNewComponentNotification(filename);
    
    // Reload components to show the newly generated one
    reload();
    
    // Show notification for 10 seconds
    setTimeout(() => {
      setNewComponentNotification(null);
    }, 10000);
  };

  return (
    <>
      {/* Hero Section - AI Chat Interface */}
      <section className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)] pt-24 pb-16">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--border-muted) 1px, transparent 1px),
                linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 md:px-8 max-w-7xl z-10">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[var(--text-primary)]">
              Component{' '}
              <span className="text-[var(--accent)]">Playground</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore interactive UI components, customize them in real-time, and copy the code
            </p>
          </motion.div>

          {/* AI Chat Interface */}
          <AIChatInterface 
            components={components}
            onComponentSuggestion={handleComponentSuggestion}
            onComponentGenerated={handleComponentGenerated}
          />
        </div>
      </section>

      {/* Component Gallery Section */}
      <SectionWrapper variant="secondary" className="py-24" ref={galleryRef}>
        {/* New Component Notification */}
        <AnimatePresence>
          {newComponentNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-xl bg-green-500/10 border-2 border-green-500/50 text-center"
            >
              <p className="text-green-600 dark:text-green-400 font-medium">
                ✨ New component "{newComponentNotification}" generated successfully! 
                <button
                  onClick={reload}
                  className="ml-2 underline hover:text-green-700 dark:hover:text-green-300 inline-flex items-center gap-1"
                >
                  {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                  Refresh Components
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--text-primary)]"
          >
            Component Library
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
          >
            Click any component to see it in action and customize its properties
          </motion.p>
        </motion.div>

        {/* Component Cards Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center py-16"
            >
              <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
              <span className="ml-3 text-[var(--text-secondary)]">Loading components...</span>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <p className="text-xl text-red-500 mb-4">Error loading components: {error}</p>
              <button
                onClick={reload}
                className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key={`components-${components.length}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {components.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <ComponentCard
                    component={component}
                    onClick={() => handleComponentClick(component)}
                    isHighlighted={highlightedComponents.includes(component.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State (if no components) */}
        {!loading && !error && components.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-[var(--text-muted)]">
              No components available yet. Check back soon!
            </p>
          </motion.div>
        )}
      </SectionWrapper>

      {/* Component Viewer Section (Dynamic) */}
      <ComponentViewer component={selectedComponent} onClose={handleCloseViewer} />
    </>
  );
}
