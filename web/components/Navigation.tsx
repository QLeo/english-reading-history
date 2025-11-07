'use client';

import Link from 'next/link';
import type { PostMetadata } from '@/lib/types';

interface NavigationProps {
  prev: PostMetadata | null;
  next: PostMetadata | null;
}

export default function Navigation({ prev, next }: NavigationProps) {
  return (
    <nav className="flex justify-between items-center gap-4 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex-1">
        {prev && (
          <Link
            href={`/read/${prev.slug}`}
            className="group flex items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
          >
            <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
            <div className="flex-1">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                {prev.title}
              </div>
            </div>
          </Link>
        )}
      </div>

      <Link
        href="/"
        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
        title="Back to home"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600 dark:text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      </Link>

      <div className="flex-1 flex justify-end">
        {next && (
          <Link
            href={`/read/${next.slug}`}
            className="group flex items-center gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex-1 text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next</div>
              <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                {next.title}
              </div>
            </div>
            <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
