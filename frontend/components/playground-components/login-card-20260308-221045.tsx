'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface LoginCardProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  showRememberMe?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

export function LoginCard({
  title = 'Welcome Back',
  subtitle = 'Please login to your account',
  buttonText = 'Sign In',
  showRememberMe = true,
  errorMessage = '',
  loading = false,
}: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-md mx-auto bg-[var(--bg-primary)] rounded-2xl border border-[var(--border)] shadow-[var(--shadow-medium)] p-6 sm:p-10"
      style={{ boxShadow: 'var(--shadow-medium)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-6 text-center"
      >
        <h2 className="text-[var(--text-primary)] text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="mt-1 text-[var(--text-muted)] text-sm sm:text-base">{subtitle}</p>
      </motion.div>
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        <motion.label
          htmlFor="email"
          className="flex flex-col text-[var(--text-secondary)] text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          Email
          <motion.input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            initial={{ boxShadow: 'none' }}
            whileFocus={{ boxShadow: '0 0 8px var(--accent-light)' }}
            transition={{ duration: 0.25 }}
            className="mt-1 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] px-4 py-3 focus:outline-none"
            placeholder="you@example.com"
          />
        </motion.label>
        <motion.label
          htmlFor="password"
          className="flex flex-col text-[var(--text-secondary)] text-sm font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.45 }}
        >
          Password
          <motion.input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            initial={{ boxShadow: 'none' }}
            whileFocus={{ boxShadow: '0 0 8px var(--accent-light)' }}
            transition={{ duration: 0.25 }}
            className="mt-1 rounded-lg border border-[var(--border-muted)] bg-[var(--bg-secondary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] px-4 py-3 focus:outline-none"
            placeholder="••••••••"
          />
        </motion.label>
        {showRememberMe && (
          <motion.div
            className="flex items-center gap-2 text-[var(--text-secondary)] text-sm select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.55 }}
          >
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              className="w-4 h-4 rounded border border-[var(--border-muted)] bg-[var(--bg-secondary)] cursor-pointer focus:ring-2 focus:ring-[var(--accent)] transition-shadow duration-300"
            />
            <label htmlFor="rememberMe" className="cursor-pointer">
              Remember me
            </label>
          </motion.div>
        )}
        {errorMessage && (
          <motion.div
            className="text-[var(--accent)] text-sm font-medium bg-[var(--accent-light)] rounded-md py-2 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            aria-live="assertive"
          >
            {errorMessage}
          </motion.div>
        )}
        <motion.button
          type="submit"
          disabled={loading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 10px var(--accent-hover)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="mt-2 w-full rounded-xl bg-[var(--accent)] text-white font-semibold py-3 shadow-[var(--shadow-strong)] hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-light)] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
        >
          {loading ? 'Signing In...' : buttonText}
        </motion.button>
      </form>
    </motion.div>
  );
}

export const componentMetadata = {
  id: 'login-card',
  name: 'Login Card',
  description: 'A professional, animated login form card with responsive and accessible UI.',
  category: 'form' as const,
  tags: ['login', 'form', 'authentication', 'card', 'animated', 'responsive', 'professional'],
  defaultProps: {
    title: 'Welcome Back',
    subtitle: 'Please login to your account',
    buttonText: 'Sign In',
    showRememberMe: true,
    errorMessage: '',
    loading: false,
  },
  controls: [
    {
      name: 'title',
      type: 'text' as const,
      defaultValue: 'Welcome Back',
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text' as const,
      defaultValue: 'Please login to your account',
      label: 'Subtitle',
    },
    {
      name: 'buttonText',
      type: 'text' as const,
      defaultValue: 'Sign In',
      label: 'Button Text',
    },
    {
      name: 'showRememberMe',
      type: 'boolean' as const,
      defaultValue: true,
      label: 'Show Remember Me',
    },
    {
      name: 'errorMessage',
      type: 'text' as const,
      defaultValue: '',
      label: 'Error Message',
    },
    {
      name: 'loading',
      type: 'boolean' as const,
      defaultValue: false,
      label: 'Loading State',
    },
  ],
  code: `<LoginCard 
  title="Welcome Back"
  subtitle="Please login to your account"
  buttonText="Sign In"
  showRememberMe={true}
  errorMessage=""
  loading={false}
/>`,
};