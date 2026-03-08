import { Hero } from '@/components/sections/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { Skills } from '@/components/sections/skills';
import { BlogPreview } from '@/components/sections/blog-preview';
import { CTA } from '@/components/sections/cta';
import { getBlogPosts, getProjects } from '@/lib/content';
import { siteConfig } from '@/lib/config';

export default function Home() {
  // Fetch data on server side
  const allPosts = getBlogPosts();
  const recentPosts = allPosts
    .slice(0, siteConfig.content.blogPreviewCount)
    .map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      readingTime: post.readingTime,
      category: post.category,
      href: `/blog/${post.slug}`,
    }));

  const allProjects = getProjects();
  const featuredProjects = allProjects
    .filter((project) => project.featured)
    .slice(0, siteConfig.content.featuredProjectsCount)
    .map((project) => ({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags,
      href: `/projects/${project.slug}`,
    }));

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      {/* <Skills /> */}
      <BlogPreview posts={recentPosts} />
      <CTA />
    </>
  );
}


