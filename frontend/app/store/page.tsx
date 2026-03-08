import { Metadata } from 'next';
import { FadeInUp } from '@/components/animations/reveal';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { StoreContent } from '@/components/store/store-content';
import { getProducts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Store - Portfolio',
  description: 'Premium UI kits, templates, and components to accelerate your development workflow.',
};

export default function StorePage() {
  const products = getProducts();

  return (
    <>
      {/* Hero Section */}
      <SectionWrapper className="pt-32 pb-16">
        <FadeInUp>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="mb-6">Digital Store</h1>
            <p className="text-xl text-[var(--text-secondary)]">
              Premium UI kits, templates, and components to accelerate your development workflow.
              Built with modern technologies and best practices.
            </p>
          </div>
        </FadeInUp>
      </SectionWrapper>

      {/* Store Content with Filters and Products */}
      <StoreContent products={products} />
    </>
  );
}
