'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Code2, Copy, Check, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PlaygroundComponent } from '@/types';
import { DynamicComponent } from './dynamic-component';
import { Button } from '@/components/ui/button';

interface ComponentViewerProps {
  component: PlaygroundComponent | null;
  onClose: () => void;
}

export function ComponentViewer({ component, onClose }: ComponentViewerProps) {
  const [copied, setCopied] = useState(false);
  const [fullSourceCode, setFullSourceCode] = useState<string>('');
  const [loadingSource, setLoadingSource] = useState(false);

  // Fetch full source code when component changes
  useEffect(() => {
    if (!component) {
      setFullSourceCode('');
      return;
    }

    const fetchSourceCode = async () => {
      setLoadingSource(true);
      try {
        // Use filename from component metadata if available
        const filename = component.filename || `${component.id}.tsx`;
        const response = await fetch(`/api/get-component-source?filename=${encodeURIComponent(filename)}`);
        
        if (response.ok) {
          const { content } = await response.json();
          setFullSourceCode(content);
        } else {
          // Fallback to the usage example if source file not found
          setFullSourceCode(component.code);
        }
      } catch (error) {
        console.error('Failed to fetch source code:', error);
        setFullSourceCode(component.code);
      } finally {
        setLoadingSource(false);
      }
    };

    fetchSourceCode();
  }, [component]);

  const handleCopyCode = () => {
    if (fullSourceCode) {
      navigator.clipboard.writeText(fullSourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {component && (
        <motion.section
          id="component-viewer"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-[var(--bg-primary)] py-24"
        >
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-12">
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <h2 className="text-4xl font-bold text-[var(--text-primary)]">
                    {component.name}
                  </h2>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--accent-light)] text-[var(--accent)]">
                    {component.category}
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[var(--text-secondary)] text-lg"
                >
                  {component.description}
                </motion.p>
                
                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {component.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)]
                         hover:bg-[var(--bg-tertiary)] hover:border-[var(--accent)]
                         flex items-center justify-center transition-all group"
              >
                <X className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--accent)]" />
              </motion.button>
            </div>

            {/* Dynamic Component Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <DynamicComponent componentData={component} />
            </motion.div>

            {/* Code Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <div className="bg-[var(--bg-secondary)] rounded-xl border border-[var(--border)] overflow-hidden">
                {/* Code Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-[var(--accent)]" />
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      Code
                    </h3>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                             bg-[var(--bg-tertiary)] hover:bg-[var(--accent-light)]
                             text-[var(--text-secondary)] hover:text-[var(--accent)]
                             border border-[var(--border)] transition-all text-sm font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                {loadingSource ? (
                  <div className="p-6 flex items-center justify-center text-[var(--text-secondary)]">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Loading source code...
                  </div>
                ) : (
                  <pre className="p-6 overflow-x-auto max-h-[600px] overflow-y-auto">
                    <code className="text-sm font-mono text-[var(--text-primary)] whitespace-pre">
                      {fullSourceCode}
                    </code>
                  </pre>
                )}
              </div>
            </motion.div>

            {/* Back to Gallery Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={onClose}
                variant="secondary"
                className="gap-2"
              >
                Back to Gallery
              </Button>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
