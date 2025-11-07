'use client';

import type { Post } from '@/lib/types';

interface ReaderProps {
  post: Post;
  englishHtml: string;
  koreanHtml: string;
  questionsHtml: string;
  vocabularyHtml: string;
}

export default function Reader({ post, englishHtml, koreanHtml, questionsHtml, vocabularyHtml }: ReaderProps) {

  return (
    <article className="container-responsive spacing-section">
      {/* Header */}
      <header className="mb-12 animate-fade-in">
        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          <span className="badge">
            {post.difficulty}
          </span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{new Date(post.date).toLocaleDateString('ko-KR')}</span>
        </div>

        {/* Title */}
        <h1 className="text-responsive-h1">
          {post.title}
        </h1>

        {/* Category & Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="badge">
            {post.category}
          </span>
          {post.tags.map(tag => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="prose max-w-none mb-16">
        <div dangerouslySetInnerHTML={{ __html: englishHtml }} />
      </div>

      {/* Comprehension Questions */}
      {questionsHtml && (
        <>
          <hr style={{ borderTop: '1px solid var(--color-border)', margin: '4rem 0' }} />
          <section className="animate-fade-in mb-16">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: questionsHtml }}
            />
          </section>
        </>
      )}

      {/* Korean Translation */}
      {koreanHtml && (
        <>
          <hr style={{ borderTop: '1px solid var(--color-border)', margin: '4rem 0' }} />
          <section className="animate-fade-in mb-16">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: koreanHtml }}
            />
          </section>
        </>
      )}

      {/* Vocabulary */}
      {vocabularyHtml && (
        <>
          <hr style={{ borderTop: '1px solid var(--color-border)', margin: '4rem 0' }} />
          <section className="animate-fade-in mb-16">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: vocabularyHtml }}
            />
          </section>
        </>
      )}
    </article>
  );
}
