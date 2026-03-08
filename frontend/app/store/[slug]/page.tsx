import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Download, ExternalLink, Star, Crown, Check, ChevronLeft } from 'lucide-react';
import { FadeInUp } from '@/components/animations/reveal';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { MDXContent } from '@/components/mdx/mdx-content';
import { getProduct, getProducts } from '@/lib/content';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} - Store`,
    description: product.excerpt,
  };
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <>
      {/* Back Button */}
      <SectionWrapper className="pt-24 pb-0">
        <FadeInUp>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Store
          </Link>
        </FadeInUp>
      </SectionWrapper>

      {/* Product Header */}
      <SectionWrapper className="pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <FadeInUp>
            <div className="sticky top-24">
              <div className="relative aspect-video rounded-2xl overflow-hidden glass-strong border border-[var(--border)]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
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

              {/* Quick Info Cards */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="glass rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                    <span className="font-bold text-[var(--text-primary)]">
                      {product.rating?.toFixed(1) || 'N/A'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{product.reviews || 0} reviews</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Download className="w-4 h-4 text-[var(--accent)]" />
                    <span className="font-bold text-[var(--text-primary)]">
                      {formatNumber(product.downloads || 0)}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">downloads</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Version</p>
                  <p className="font-bold text-[var(--text-primary)]">{product.version || '1.0'}</p>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* Product Info */}
          <FadeInUp delay={0.1}>
            <div>
              {/* Category Badge */}
              <div className="inline-block px-3 py-1 text-sm font-medium rounded-full glass neon-border text-[var(--accent)] mb-4">
                {product.category}
              </div>

              {/* Title & Price */}
              <h1 className="mb-4">{product.title}</h1>
              <p className="text-xl text-[var(--text-secondary)] mb-6">
                {product.excerpt}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-bold text-[var(--accent)] neon-text">
                  ${product.price}
                </span>
                <span className="text-[var(--text-muted)]">one-time payment</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-white rounded-xl font-semibold hover:bg-[var(--accent-hover)] transition-all duration-200 neon-border hover:neon-glow">
                  <ShoppingCart className="w-5 h-5" />
                  Purchase Now
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

              {/* What's Included */}
              <div className="glass rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
                  What's Included
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Complete source code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Lifetime updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Documentation & examples</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Commercial license</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-secondary)]">Email support</span>
                  </li>
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold mb-3 text-[var(--text-muted)]">
                  Technologies
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
            </div>
          </FadeInUp>
        </div>
      </SectionWrapper>

      {/* Product Description */}
      <SectionWrapper variant="secondary" className="py-16">
        <FadeInUp>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXContent source={product.content} />
            </div>
          </div>
        </FadeInUp>
      </SectionWrapper>

      {/* Product Metadata */}
      <SectionWrapper className="py-16">
        <FadeInUp>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
                Product Details
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Version</dt>
                  <dd className="font-medium text-[var(--text-primary)]">{product.version}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Last Updated</dt>
                  <dd className="font-medium text-[var(--text-primary)]">
                    {new Date(product.lastUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">Difficulty</dt>
                  <dd className="font-medium text-[var(--text-primary)] capitalize">
                    {product.difficulty}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-muted)]">License</dt>
                  <dd className="font-medium text-[var(--text-primary)]">{product.license}</dd>
                </div>
              </dl>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
                Money-Back Guarantee
              </h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Not satisfied? We offer a 30-day money-back guarantee. No questions asked.
              </p>
              <button className="w-full px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-semibold hover:bg-[var(--accent-hover)] transition-all duration-200">
                Purchase with Confidence
              </button>
            </div>
          </div>
        </FadeInUp>
      </SectionWrapper>
    </>
  );
}
