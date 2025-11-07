'use client';

import Link from 'next/link';
import type { PostMetadata } from '@/lib/types';

interface BookShelfProps {
  posts: PostMetadata[];
}

interface GroupedPosts {
  [category: string]: PostMetadata[];
}

export default function BookShelf({ posts }: BookShelfProps) {
  // Group posts by category
  const groupedPosts = posts.reduce<GroupedPosts>((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {});

  const categories = Object.keys(groupedPosts);

  return (
    <div className="container-responsive spacing-section">
      {/* Hero Header */}
      <header className="mb-12 sm:mb-16 text-center animate-fade-in">
        <h1 className="text-responsive-h1 mb-4 sm:mb-6 text-[var(--color-text-primary)]">
          English Reading Library
        </h1>
        <p className="text-responsive-body text-[var(--color-text-secondary)] max-w-2xl mx-auto">
          Improve your English reading skills with bilingual content
        </p>
      </header>

      {/* Category Sections */}
      {categories.map((category, idx) => (
        <section
          key={category}
          className="mb-12 sm:mb-16 animate-fade-in"
          style={{ animationDelay: `${idx * 0.1}s` }}
        >
          {/* Category Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-8">
            <h2 className="text-responsive-h2 text-[var(--color-text-primary)]">
              {category}
            </h2>
            <span
              className="badge"
              style={{
                background: 'var(--color-primary-100)',
                color: 'var(--color-primary-800)'
              }}
            >
              {groupedPosts[category].length} {groupedPosts[category].length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {groupedPosts[category].map(post => (
              <Link
                key={post.slug}
                href={`/read/${post.slug}`}
                className="card card-hover group block p-5 sm:p-6"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <span
                    className="badge text-xs sm:text-sm"
                    style={{
                      background: 'var(--color-accent-100)',
                      color: 'var(--color-accent-800)'
                    }}
                  >
                    {post.difficulty}
                  </span>
                  <span className="text-xs sm:text-sm text-[var(--color-text-tertiary)] flex items-center gap-1">
                    <span role="img" aria-label="Reading time">⏱️</span>
                    {post.readingTime}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 transition-colors"
                  style={{
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {post.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-xs"
                      style={{
                        background: 'var(--color-bg-secondary)',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-border-light)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span
                      className="px-2 py-1 rounded-md text-xs"
                      style={{
                        color: 'var(--color-text-tertiary)'
                      }}
                    >
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Card Footer */}
                <div
                  className="flex items-center justify-between text-sm pt-4"
                  style={{
                    borderTop: '1px solid var(--color-border-light)',
                    color: 'var(--color-text-tertiary)'
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <span role="img" aria-label="Date">📅</span>
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </span>
                  <span
                    className="group-hover:translate-x-1 transition-transform text-base"
                    style={{ color: 'var(--color-primary-500)' }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Empty State */}
      {categories.length === 0 && (
        <div
          className="text-center py-16 sm:py-24 card"
          style={{
            background: 'var(--color-bg-secondary)'
          }}
        >
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-responsive-h3 mb-2 text-[var(--color-text-primary)]">
            No articles yet
          </h2>
          <p className="text-responsive-body text-[var(--color-text-secondary)]">
            Add some markdown files to get started!
          </p>
        </div>
      )}
    </div>
  );
}
