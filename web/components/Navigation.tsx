'use client';

import Link from 'next/link';
import type { PostMetadata } from '@/lib/types';

interface NavigationProps {
  prev: PostMetadata | null;
  next: PostMetadata | null;
}

export default function Navigation({ prev, next }: NavigationProps) {
  return (
    <nav
      className="py-8 sm:py-12 mt-12 sm:mt-16"
      style={{
        borderTop: '2px solid var(--color-border-default)'
      }}
      aria-label="Article navigation"
    >
      {/* Desktop Layout */}
      <div className="hidden sm:flex justify-between items-center gap-4">
        {/* Previous Article */}
        <div className="flex-1">
          {prev ? (
            <Link
              href={`/read/${prev.slug}`}
              className="card card-hover group flex items-center gap-3 p-4 sm:p-5"
            >
              <span
                className="text-2xl sm:text-3xl group-hover:-translate-x-1 transition-transform flex-shrink-0"
                style={{ color: 'var(--color-primary-500)' }}
              >
                ←
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mb-1 flex items-center gap-1.5">
                  <span role="img" aria-hidden="true">⬅️</span>
                  Previous
                </div>
                <div
                  className="font-medium text-sm sm:text-base line-clamp-2 transition-colors"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Home Button */}
        <Link
          href="/"
          className="card card-hover p-4 sm:p-5 focus-ring"
          title="Back to library"
          aria-label="Back to library"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 sm:w-7 sm:h-7"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </Link>

        {/* Next Article */}
        <div className="flex-1 flex justify-end">
          {next ? (
            <Link
              href={`/read/${next.slug}`}
              className="card card-hover group flex items-center gap-3 p-4 sm:p-5"
            >
              <div className="flex-1 text-right min-w-0">
                <div className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mb-1 flex items-center justify-end gap-1.5">
                  Next
                  <span role="img" aria-hidden="true">➡️</span>
                </div>
                <div
                  className="font-medium text-sm sm:text-base line-clamp-2 transition-colors"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {next.title}
                </div>
              </div>
              <span
                className="text-2xl sm:text-3xl group-hover:translate-x-1 transition-transform flex-shrink-0"
                style={{ color: 'var(--color-primary-500)' }}
              >
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="sm:hidden space-y-3">
        {/* Home Button - Mobile */}
        <Link
          href="/"
          className="card card-hover flex items-center justify-center gap-3 p-4 focus-ring"
          aria-label="Back to library"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
          <span className="font-medium text-[var(--color-text-primary)]">
            Back to Library
          </span>
        </Link>

        {/* Previous Article - Mobile */}
        {prev && (
          <Link
            href={`/read/${prev.slug}`}
            className="card card-hover group flex items-start gap-3 p-4"
          >
            <span
              className="text-2xl group-hover:-translate-x-1 transition-transform flex-shrink-0"
              style={{ color: 'var(--color-primary-500)' }}
            >
              ←
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[var(--color-text-tertiary)] mb-1">
                Previous Article
              </div>
              <div
                className="font-medium text-sm line-clamp-2 transition-colors"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {prev.title}
              </div>
            </div>
          </Link>
        )}

        {/* Next Article - Mobile */}
        {next && (
          <Link
            href={`/read/${next.slug}`}
            className="card card-hover group flex items-start gap-3 p-4"
          >
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[var(--color-text-tertiary)] mb-1">
                Next Article
              </div>
              <div
                className="font-medium text-sm line-clamp-2 transition-colors"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {next.title}
              </div>
            </div>
            <span
              className="text-2xl group-hover:translate-x-1 transition-transform flex-shrink-0"
              style={{ color: 'var(--color-primary-500)' }}
            >
              →
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
