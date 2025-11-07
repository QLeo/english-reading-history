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
      {/* Header */}
      <header className="mb-12 sm:mb-16 animate-fade-in">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
          <span className="badge" style={{
            background: 'var(--color-badge-purple)',
            color: 'var(--color-badge-purple-text)'
          }}>
            {post.difficulty}
          </span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
        </div>

        {/* Title */}
        <h1 className="text-responsive-h1 mb-8" style={{ color: 'var(--color-text-primary)' }}>
          {post.title}
        </h1>

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="badge" style={{
            background: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)'
          }}>
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span
              key={tag}
              className="badge"
              style={{
                background: 'transparent',
                color: 'var(--color-text-tertiary)',
                border: '1px solid var(--color-border)'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Language Toggle */}
        <div className="flex justify-start">
          <LanguageToggle onModeChange={setDisplayMode} />
        </div>
      </header>

      {/* Main Content */}
      <div className="prose max-w-none mb-16">
        {displayMode === 'english' && (
          <div
            className="animate-fade-in"
            dangerouslySetInnerHTML={{ __html: englishHtml }}
          />
        )}

        {displayMode === 'korean' && koreanHtml && (
          <div
            className="animate-fade-in"
            dangerouslySetInnerHTML={{ __html: koreanHtml }}
          />
        )}

        {displayMode === 'both' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div
              className="animate-fade-in lg:border-r lg:pr-8"
              style={{ borderColor: 'var(--color-border)' }}
              dangerouslySetInnerHTML={{ __html: englishHtml }}
            />
            {koreanHtml && (
              <div
                className="animate-fade-in"
                dangerouslySetInnerHTML={{ __html: koreanHtml }}
              />
            )}
          </div>
        )}
      </div>

      {/* Comprehension Questions Section */}
      {questionsHtml && (
        <section
          className="section-container mb-8 animate-fade-in"
          style={{
            background: 'var(--color-section-questions)'
          }}
        >
          <h2 className="text-responsive-h3 mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Comprehension Questions
          </h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: questionsHtml }}
          />
        </section>
      )}

      {/* Korean Translation Section */}
      {koreanHtml && displayMode === 'english' && (
        <section
          className="section-container mb-8 animate-fade-in"
          style={{
            background: 'var(--color-section-translation)'
          }}
        >
          <h2 className="text-responsive-h3 mb-6" style={{ color: 'var(--color-text-primary)' }}>
            한국어 번역
          </h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: koreanHtml }}
          />
        </section>
      )}

      {/* Vocabulary & Expressions Section */}
      {vocabularyHtml && (
        <section
          className="section-container animate-fade-in"
          style={{
            background: 'var(--color-section-vocabulary)'
          }}
        >
          <h2 className="text-responsive-h3 mb-6" style={{ color: 'var(--color-text-primary)' }}>
            Useful Expressions & Vocabulary
          </h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: vocabularyHtml }}
          />
        </section>
      )}
    </article>
  );
}
