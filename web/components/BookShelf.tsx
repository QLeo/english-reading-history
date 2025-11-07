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
      <header className="mb-16 animate-fade-in">
        <h1 className="text-responsive-h1 mb-4" style={{ color: 'var(--color-text-primary)' }}>
          English Reading Library
        </h1>
        <p className="text-responsive-body" style={{ color: 'var(--color-text-secondary)' }}>
          Improve your English reading skills with bilingual content
        </p>
      </header>

      {/* Category Sections */}
      {categories.map((category) => (
        <section
          key={category}
          className="mb-16 animate-fade-in"
        >
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-responsive-h2" style={{ color: 'var(--color-text-primary)' }}>
              {category}
            </h2>
            <span
              className="badge text-sm"
              style={{
                background: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-tertiary)'
              }}
            >
              {groupedPosts[category].length}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedPosts[category].map(post => (
              <Link
                key={post.slug}
                href={`/read/${post.slug}`}
                className="card card-hover group block p-6"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="badge text-sm"
                    style={{
                      background: 'var(--color-badge-purple)',
                      color: 'var(--color-badge-purple-text)'
                    }}
                  >
                    {post.difficulty}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                    {post.readingTime}
                  </span>
                </div>

                {/* Card Title */}
                <h3
                  className="text-xl font-semibold mb-4"
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
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        background: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-tertiary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span
                      className="text-xs px-2 py-1"
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
                    borderTop: '1px solid var(--color-border)',
                    color: 'var(--color-text-tertiary)'
                  }}
                >
                  <span>
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </span>
                  <span
                    className="transition-transform group-hover:translate-x-1"
                    style={{ color: 'var(--color-primary)' }}
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
          className="text-center py-24 rounded-xl"
          style={{
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)'
          }}
        >
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-responsive-h3 mb-2" style={{ color: 'var(--color-text-primary)' }}>
            No articles yet
          </h2>
          <p className="text-responsive-body" style={{ color: 'var(--color-text-secondary)' }}>
            Add some markdown files to get started
          </p>
        </div>
      )}
    </div>
  );
}
