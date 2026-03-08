import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { FadeInUp } from '@/components/animations/reveal';
import { SectionWrapper } from '@/components/layout/section-wrapper';
import { Button } from '@/components/ui/button';
import { MDXContent } from '@/components/mdx/mdx-content';
import { getProject, getProjects } from '@/lib/content';

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Projects`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Back Button */}
      <SectionWrapper className="pt-24 pb-0 md:pb-0 lg:pb-0">
        <FadeInUp>
          <Link href="/projects">
            <Button variant="ghost" className="gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Button>
          </Link>
        </FadeInUp>
      </SectionWrapper>

      {/* Hero Image */}
      <SectionWrapper className="py-0 md:py-0 lg:py-0">
        <FadeInUp>
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[var(--bg-tertiary)] mb-12">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeInUp>
      </SectionWrapper>

      {/* Project Header */}
      <SectionWrapper className="pt-0 md:pt-0 lg:pt-0">
        <FadeInUp delay={0.1}>
          <div className="mb-12">
            <h1 className="mb-4">{project.title}</h1>
            <p className="text-xl text-[var(--text-secondary)] mb-6">
              {project.longDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border)] text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="gap-2">
                    <Github className="w-4 h-4" />
                    View Code
                  </Button>
                </a>
              )}
            </div>
          </div>
        </FadeInUp>

        {/* Content */}
        <FadeInUp delay={0.2}>
          <article className="max-w-none">
            <MDXContent source={project.content} />
          </article>
        </FadeInUp>
      </SectionWrapper>
    </>
  );
}
