'use client';

import { FadeInUp } from '@/components/animations/reveal';
import { BlogCard } from '@/components/cards/blog-card';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/config';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  href: string;
}

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <SectionWrapper id="blog" variant="secondary">
      <FadeInUp>
        <div className="text-center mb-4">
          <h2 className="mb-4">{siteConfig.sections.blog.title}</h2>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {siteConfig.sections.blog.description}
          </p>
        </div>
      </FadeInUp>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-2">
        {posts.map((post, index) => (
          <FadeInUp key={post.title} delay={index * 0.1}>
            <BlogCard {...post} />
          </FadeInUp>
        ))}
      </div>

      <FadeInUp delay={0.4}>
        <div className="text-center">
          <Link href="/blog">
            <Button variant="secondary" size="lg" className="gap-2 group">
              Read All Articles
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </FadeInUp>
    </SectionWrapper>
  );
}
