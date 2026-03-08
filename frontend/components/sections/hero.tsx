'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Code2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/config';

const socialLinks = [
  { icon: Github, href: siteConfig.social.github, label: 'GitHub' },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: siteConfig.social.twitter, label: 'Twitter' },
  { icon: Code2, href: siteConfig.social.leetcode, label: 'LeetCode' },
  { icon: Mail, href: `mailto:${siteConfig.contact.email}`, label: 'Email' },
];

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, var(--border-muted) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-muted) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="relative container mx-auto px-6 md:px-8 max-w-[var(--max-width)] z-10">
        {/* Content Layout */}
        <div className="max-w-4xl mx-auto">
          
          {/* Left Column - Primary Messaging (60%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            {siteConfig.availability.isAvailable && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] shadow-[var(--shadow-soft)]"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  {siteConfig.availability.statusText}
                </span>
              </motion.div>
            )}

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[var(--text-primary)]"
                style={{ letterSpacing: '-0.02em' }}
              >
                Hi, I am
                <span className="block text-[var(--accent)]">{siteConfig.personal.name}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
                style={{ lineHeight: '1.6' }}
              >
                {siteConfig.personal.shortBio}
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/projects">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="gap-2 group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Projects
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--bg-tertiary)] transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
