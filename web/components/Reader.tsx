'use client';

import { useState } from 'react';
import LanguageToggle, { type DisplayMode } from './LanguageToggle';
import type { Post } from '@/lib/types';

interface ReaderProps {
  post: Post;
  englishHtml: string;
  koreanHtml: string;
  questionsHtml: string;
  vocabularyHtml: string;
}

export default function Reader({ post, englishHtml, koreanHtml, questionsHtml, vocabularyHtml }: ReaderProps) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('english');

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold">
            {post.difficulty}
          </span>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{post.readingTime}</span>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(post.date).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex justify-center">
          <LanguageToggle onModeChange={setDisplayMode} />
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {displayMode === 'english' && (
          <div
            className="english-content"
            dangerouslySetInnerHTML={{ __html: englishHtml }}
          />
        )}

        {displayMode === 'korean' && koreanHtml && (
          <div
            className="korean-content"
            dangerouslySetInnerHTML={{ __html: koreanHtml }}
          />
        )}

        {displayMode === 'both' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="english-content border-r dark:border-gray-700 pr-8"
              dangerouslySetInnerHTML={{ __html: englishHtml }}
            />
            {koreanHtml && (
              <div
                className="korean-content"
                dangerouslySetInnerHTML={{ __html: koreanHtml }}
              />
            )}
          </div>
        )}
      </div>

      {/* Questions Section */}
      {questionsHtml && (
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: questionsHtml }}
          />
        </div>
      )}

      {/* Vocabulary Section */}
      {vocabularyHtml && (
        <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: vocabularyHtml }}
          />
        </div>
      )}
    </article>
  );
}
