'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SignUpProps {
  title?: string;
  submitText?: string;
  showPasswordToggle?: boolean;
  accentColor?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUp({
  title = 'Create Your Account',
  submitText = 'Sign Up',
  showPasswordToggle = true,
  accentColor = 'var(--accent)',
}: SignUpProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
    ) {
      newErrors.email = 'Invalid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-md w-full bg-[var(--bg-primary)] rounded-xl border border-[var(--border)] shadow-[var(--shadow-soft)] p-6 sm:p-8 mx-auto relative"
    >
      <h2
        className="text-[var(--text-primary)] font-extrabold text-xl sm:text-2xl mb-6 select-none"
        aria-label={title}
      >
        {title}
      </h2>
      {submitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[var(--bg-secondary)] border border-[var(--accent)] p-4 rounded-md shadow-[var(--shadow-medium)] text-center font-semibold text-[var(--accent)] select-none"
        >
          Thank you for signing up!
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-[var(--text-secondary)] select-none"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              className={`w-full rounded-md border border-[var(--border-muted)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] shadow-[var(--shadow-soft)] transition-colors duration-300 focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-[var(--accent)] focus:ring-[var(--accent)]'
                  : 'focus:border-[var(--accent)] focus:ring-[var(--accent-light)]'
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                className="mt-1 text-[var(--accent)] text-sm font-medium select-none"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-[var(--text-secondary)] select-none"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
                className={`w-full rounded-md border border-[var(--border-muted)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] shadow-[var(--shadow-soft)] transition-colors duration-300 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? 'border-[var(--accent)] focus:ring-[var(--accent)]'
                    : 'focus:border-[var(--accent)] focus:ring-[var(--accent-light)]'
                }`}
              />
              {showPasswordToggle && (
                <motion.button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  whileTap={{ scale: 0.85 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-300 select-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 014.625-8.204M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.03 2.988-3.75 5.158-7.481 5.64M15.656 15.656A3.975 3.975 0 0112 17a4 4 0 01-4-4c0-.537.118-1.05.328-1.514"
                      />
                    </svg>
                  )}
                </motion.button>
              )}
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="mt-1 text-[var(--accent)] text-sm font-medium select-none"
              >
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-semibold text-[var(--text-secondary)] select-none"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
                className={`w-full rounded-md border border-[var(--border-muted)] bg-[var(--bg-secondary)] py-2 px-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] shadow-[var(--shadow-soft)] transition-colors duration-300 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? 'border-[var(--accent)] focus:ring-[var(--accent)]'
                    : 'focus:border-[var(--accent)] focus:ring-[var(--accent-light)]'
                }`}
              />
              {showPasswordToggle && (
                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  whileTap={{ scale: 0.85 }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors duration-300 select-none"
                  aria-label={
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 014.625-8.204M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.03 2.988-3.75 5.158-7.481 5.64M15.656 15.656A3.975 3.975 0 0112 17a4 4 0 01-4-4c0-.537.118-1.05.328-1.514"
                      />
                    </svg>
                  )}
                </motion.button>
              )}
            </div>
            {errors.confirmPassword && (
              <p
                id="confirmPassword-error"
                className="mt-1 text-[var(--accent)] text-sm font-medium select-none"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            initial={{ opacity: 0.9 }}
            animate={{ opacity: submitting ? 0.6 : 1 }}
            whileHover={!submitting ? { scale: 1.05 } : {}}
            whileTap={!submitting ? { scale: 0.95 } : {}}
            transition={{ duration: 0.3 }}
            disabled={submitting}
            style={{ backgroundColor: accentColor }}
            className="w-full py-3 rounded-lg font-semibold text-white shadow-[var(--shadow-medium)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-light)] transition-all duration-300 select-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <svg
                className="animate-spin mx-auto h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            ) : (
              submitText
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}

export const componentMetadata = {
  id: 'sign-up-form',
  name: 'Sign Up Form',
  description: 'A modern, animated sign up form component with validation.',
  category: 'form' as const,
  tags: ['sign up', 'form', 'validation', 'animated', 'react', 'typescript', 'tailwind', 'framer-motion'],
  defaultProps: {
    title: 'Create Your Account',
    submitText: 'Sign Up',
    showPasswordToggle: true,
    accentColor: 'var(--accent)',
  },
  controls: [
    {
      name: 'title',
      type: 'text' as const,
      defaultValue: 'Create Your Account',
      label: 'Form Title',
    },
    {
      name: 'submitText',
      type: 'text' as const,
      defaultValue: 'Sign Up',
      label: 'Submit Button Text',
    },
    {
      name: 'showPasswordToggle',
      type: 'boolean' as const,
      defaultValue: true,
      label: 'Show Password Toggle',
    },
    {
      name: 'accentColor',
      type: 'color' as const,
      defaultValue: 'var(--accent)',
      label: 'Accent Color',
    },
  ],
  code: `<SignUp 
  title="Create Your Account" 
  submitText="Sign Up" 
  showPasswordToggle={true} 
  accentColor="var(--accent)" 
/>`,
};