'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Zap, Loader2 } from 'lucide-react';
import { searchComponents } from '@/lib/dynamic-component-loader';
import { generateComponent, saveGeneratedComponent } from '@/services/component-generator';
import { PlaygroundComponent } from '@/types';

interface AIChatInterfaceProps {
  components?: PlaygroundComponent[]; // Dynamic components array
  onComponentSuggestion?: (componentIds: string[]) => void;
  onComponentGenerated?: (filename: string) => void;
}

export function AIChatInterface({ components = [], onComponentSuggestion, onComponentGenerated }: AIChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const quickActions = [
    'Animated button with gradient',
    'Card with image and hover effect',
    'Loading spinner',
    'Toggle switch',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // First, check if we have existing components matching the query
      const matchedComponents = searchComponents(components, userMessage);
      
      if (matchedComponents.length > 0) {
        // Show existing components
        const componentIds = matchedComponents.map((c) => c.id);
        const response = `I found ${matchedComponents.length} existing component${matchedComponents.length > 1 ? 's' : ''} matching "${userMessage}": ${matchedComponents.map(c => c.name).join(', ')}. Would you like me to generate a new custom component instead?`;
        
        setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
        onComponentSuggestion?.(componentIds);
        setIsTyping(false);
      } else {
        // Generate new component using AI
        setIsTyping(false);
        setIsGenerating(true);
        
        setMessages((prev) => [...prev, { 
          role: 'assistant', 
          content: '🎨 Generating your custom component... This may take a few seconds.' 
        }]);

        const result = await generateComponent(userMessage);
        
        // Save the generated component
        const saveResult = await saveGeneratedComponent(result.code, result.filename);
        
        if (saveResult.success) {
          setMessages((prev) => [...prev, { 
            role: 'assistant', 
            content: `✨ Successfully generated "${result.filename}"! The component has been added to your playground. Refresh the page to see it in the gallery.` 
          }]);
          
          // Notify parent component
          onComponentGenerated?.(result.filename);
        } else {
          throw new Error(saveResult.message);
        }
        
        setIsGenerating(false);
      }
    } catch (error) {
      setIsTyping(false);
      setIsGenerating(false);
      
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: `❌ Error: ${errorMessage}. Please make sure the backend server is running on http://localhost:8000` 
      }]);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main Chat Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[var(--bg-secondary)]/80 backdrop-blur-xl border border-[var(--border)]/50 
                   rounded-2xl p-8 md:p-12 shadow-[var(--shadow-strong)]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[var(--accent)]" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2"
          >
            What do you want to design today?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[var(--text-secondary)]"
          >
            Ask me about components, request designs, or explore the gallery below
          </motion.p>
        </div>

        {/* Messages */}
        {messages.length > 0 && (
          <div className="mb-6 max-h-60 overflow-y-auto space-y-3">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-[var(--accent)]/10 text-[var(--text-primary)] ml-8'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] mr-8'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing/Generating Indicator */}
            {(isTyping || isGenerating) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 p-3 bg-[var(--bg-tertiary)] rounded-lg mr-8"
              >
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[var(--accent)] rounded-full"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--text-secondary)]">
                  {isGenerating ? 'Generating component...' : 'Thinking...'}
                </span>
              </motion.div>
            )}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isGenerating}
              placeholder="Try: 'Create an animated button with gradient' or 'Make a card with hover effect'"
              className="w-full px-6 py-4 pr-14 rounded-xl bg-[var(--bg-tertiary)] 
                       border-2 border-[var(--border)] text-[var(--text-primary)]
                       placeholder:text-[var(--text-muted)]
                       focus:outline-none focus:border-[var(--accent)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors text-lg"
            />
            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="absolute right-2 top-1/2 -translate-y-1/2 
                       w-10 h-10 rounded-lg bg-[var(--accent)] text-white
                       hover:bg-[var(--accent-hover)] disabled:opacity-50
                       disabled:cursor-not-allowed transition-all
                       flex items-center justify-center"
            >
              {isGenerating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 justify-center">
          {quickActions.map((action) => (
            <motion.button
              key={action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction(action)}
              className="px-4 py-2 rounded-full bg-[var(--bg-tertiary)]
                       hover:bg-[var(--accent-light)] hover:text-[var(--accent)]
                       border border-[var(--border)] text-sm font-medium
                       text-[var(--text-secondary)] transition-all
                       flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              {action}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
