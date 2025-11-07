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
    <article className="container-responsive spacing-section">
      {/* Header - Mobile Optimized */}
      <header className="mb-8 sm:mb-12 animate-fade-in">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="badge" style={{
            background: 'var(--color-accent-100)',
            color: 'var(--color-accent-800)'
          }}>
            {post.difficulty}
          </span>
          <span className="text-[var(--color-text-tertiary)] hidden sm:inline">•</span>
          <span className="text-sm text-[var(--color-text-tertiary)]">{post.readingTime}</span>
          <span className="text-[var(--color-text-tertiary)] hidden sm:inline">•</span>
          <span className="text-sm text-[var(--color-text-tertiary)]">
            {new Date(post.date).toLocaleDateString('ko-KR')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-responsive-h1 mb-4 sm:mb-6 text-[var(--color-text-primary)] leading-tight">
          {post.title}
        </h1>

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
          <span className="badge" style={{
            background: 'var(--color-primary-100)',
            color: 'var(--color-primary-800)'
          }}>
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span
              key={tag}
              className="badge"
              style={{
                background: 'var(--color-bg-secondary)',
                color: 'var(--color-text-secondary)',
                border: '1px solid var(--color-border-light)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Language Toggle - Sticky on mobile */}
        <div className="flex justify-center sticky top-0 z-10 bg-[var(--color-bg-primary)] py-4 -mx-4 px-4 sm:static sm:bg-transparent sm:py-0 sm:mx-0 sm:px-0">
          <LanguageToggle onModeChange={setDisplayMode} />
        </div>
      </header>

      {/* Main Content - Improved Spacing */}
      <div className="prose prose-lg max-w-none mb-8 sm:mb-12">
        {displayMode === 'english' && (
          <div
            className="english-content animate-fade-in"
            dangerouslySetInnerHTML={{ __html: englishHtml }}
          />
        )}

        {displayMode === 'korean' && koreanHtml && (
          <div
            className="korean-content animate-fade-in"
            dangerouslySetInnerHTML={{ __html: koreanHtml }}
          />
        )}

        {displayMode === 'both' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div
              className="english-content lg:border-r lg:pr-8 animate-fade-in"
              style={{ borderColor: 'var(--color-border-light)' }}
              dangerouslySetInnerHTML={{ __html: englishHtml }}
            />
            {koreanHtml && (
              <div
                className="korean-content animate-fade-in"
                style={{ animationDelay: '0.1s' }}
                dangerouslySetInnerHTML={{ __html: koreanHtml }}
              />
            )}
          </div>
        )}
      </div>

      {/* Comprehension Questions Section - Enhanced with Icons */}
      {questionsHtml && (
        <section
          className="section-container mb-6 sm:mb-8 animate-fade-in"
          style={{
            background: 'var(--color-section-questions)',
            borderColor: 'var(--color-primary-300)'
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl sm:text-3xl" role="img" aria-label="Questions">
              ❓
            </span>
            <h2 className="text-responsive-h3 text-[var(--color-text-primary)] m-0">
              Comprehension Questions
            </h2>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: questionsHtml }}
          />
        </section>
      )}

      {/* Korean Translation Section - Enhanced */}
      {koreanHtml && displayMode === 'english' && (
        <section
          className="section-container mb-6 sm:mb-8 animate-fade-in"
          style={{
            background: 'var(--color-section-translation)',
            borderColor: 'var(--color-accent-300)'
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl sm:text-3xl" role="img" aria-label="Translation">
              🌐
            </span>
            <h2 className="text-responsive-h3 text-[var(--color-text-primary)] m-0">
              한국어 번역 (Korean Translation)
            </h2>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: koreanHtml }}
          />
        </section>
      )}

      {/* Vocabulary & Expressions Section - Enhanced */}
      {vocabularyHtml && (
        <section
          className="section-container animate-fade-in"
          style={{
            background: 'var(--color-section-vocabulary)',
            borderColor: 'var(--color-accent-300)'
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl sm:text-3xl" role="img" aria-label="Vocabulary">
              📚
            </span>
            <h2 className="text-responsive-h3 text-[var(--color-text-primary)] m-0">
              Useful Expressions & Vocabulary
            </h2>
          </div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: vocabularyHtml }}
          />
        </section>
      )}
    </article>
  );
}
