'use client';

import { useState, useMemo } from 'react';
import { FadeInUp } from '@/components/animations/reveal';
import { ProductCard } from '@/components/cards/product-card';
import { StoreFilters } from '@/components/store/store-filters';
import { ProductOverlay } from '@/components/store/product-overlay';
import type { Product } from '@/lib/content';

interface StoreContentProps {
  products: Product[];
}

export function StoreContent({ products }: StoreContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    // Delay clearing the product to allow exit animation
    setTimeout(() => setSelectedProduct(null), 200);
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'popular':
        default:
          return (b.downloads || 0) - (a.downloads || 0);
      }
    });

    return sorted;
  }, [products, selectedCategory, sortBy]);

  return (
    <>
      {/* Filters */}
      <StoreFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Products Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <FadeInUp key={product.slug} delay={index * 0.05}>
                <ProductCard
                  title={product.title}
                  excerpt={product.excerpt}
                  price={product.price}
                  category={product.category}
                  image={product.image}
                  tags={product.tags}
                  rating={product.rating}
                  reviews={product.reviews}
                  downloads={product.downloads}
                  isPro={product.isPro}
                  onClick={() => handleProductClick(product)}
                />
              </FadeInUp>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <FadeInUp>
              <div className="text-center py-16">
                <p className="text-xl text-[var(--text-muted)]">
                  No products found. Try adjusting your filters.
                </p>
              </div>
            </FadeInUp>
          )}

          {/* Product Count */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Overlay */}
      <ProductOverlay
        product={selectedProduct}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </>
  );
}
