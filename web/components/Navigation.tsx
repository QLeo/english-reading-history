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
      className="py-12 mt-16"
      style={{
        borderTop: '1px solid var(--color-border)'
      }}
      aria-label="Article navigation"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Previous Article */}
        {prev ? (
          <Link
            href={`/read/${prev.slug}`}
            className="card card-hover group p-5"
          >
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
              ← Previous
            </div>
            <div
              className="font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {prev.title}
            </div>
          </Link>
        ) : (
          <div />
        )}

        {/* Next Article */}
        {next ? (
          <Link
            href={`/read/${next.slug}`}
            className="card card-hover group p-5 text-right"
          >
            <div className="text-xs mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
              Next →
            </div>
            <div
              className="font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {next.title}
            </div>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Home Button */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="card card-hover px-6 py-3 text-sm focus-ring inline-flex items-center gap-2"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          ← Back to Library
        </Link>
      </div>
    </nav>
  );
}
