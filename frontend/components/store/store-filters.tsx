'use client';

import { useState, useMemo } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StoreFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export function StoreFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: StoreFiltersProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Popular';

  return (
    <div className="sticky top-20 z-50 border-b border-[var(--border)] backdrop-blur-md bg-[var(--bg-primary)]/95 supports-[backdrop-filter]:bg-[var(--bg-primary)]/80">      <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong hover:neon-border transition-all duration-200 text-sm font-medium text-[var(--text-primary)]"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              sortOpen && "rotate-180"
            )} />
          </button>

          <AnimatePresence>
            {sortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSortOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-56 glass-strong rounded-xl border border-[var(--border)] overflow-hidden shadow-[var(--shadow-strong)] z-20"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setSortOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 text-left text-sm transition-colors duration-200",
                        sortBy === option.value
                          ? "bg-[var(--accent)] text-white font-medium"
                          : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Category Tabs - Desktop */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                selectedCategory === category
                  ? "glass-strong neon-border text-[var(--accent)] neon-text"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:glass"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Category Filter */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong hover:neon-border transition-all duration-200 text-sm font-medium text-[var(--text-primary)]"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <AnimatePresence>
            {filtersOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setFiltersOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-64 glass-strong rounded-xl border border-[var(--border)] overflow-hidden shadow-[var(--shadow-strong)] z-20"
                >
                  <div className="p-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          onCategoryChange(category);
                          setFiltersOpen(false);
                        }}
                        className={cn(
                          "w-full px-4 py-3 text-left text-sm rounded-lg transition-colors duration-200",
                          selectedCategory === category
                            ? "bg-[var(--accent)] text-white font-medium"
                            : "text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Advanced Filters Button */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg glass-strong hover:neon-border transition-all duration-200 text-sm font-medium text-[var(--text-primary)]">
          <Filter className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>
    </div>
    </div>
  );
}
