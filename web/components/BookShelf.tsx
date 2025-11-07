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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          English Reading Library
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Improve your English reading skills with bilingual content
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {category}
            </h2>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
              {groupedPosts[category].length} {groupedPosts[category].length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedPosts[category].map(post => (
              <Link
                key={post.slug}
                href={`/read/${post.slug}`}
                className="group block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs font-semibold">
                    {post.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {post.readingTime}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {categories.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No articles found. Add some markdown files to get started!
        </div>
      )}
    </div>
  );
}
