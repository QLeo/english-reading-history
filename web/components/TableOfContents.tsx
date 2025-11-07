'use client';

import { useEffect, useState } from 'react';
import type { HeadingItem } from '@/lib/types';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu after clicking
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full focus-ring"
        style={{
          background: 'var(--color-primary-600)',
          color: 'white',
          boxShadow: 'var(--shadow-xl)',
          minHeight: '56px',
          minWidth: '56px'
        }}
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        <span className="text-xl">{isOpen ? '✕' : '📑'}</span>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Table of Contents Panel */}
      <nav
        className={`
          fixed lg:sticky
          top-0 lg:top-8
          right-0 lg:right-auto
          h-full lg:h-auto
          w-80 lg:w-auto
          max-h-screen lg:max-h-[calc(100vh-4rem)]
          overflow-y-auto
          z-40 lg:z-auto
          p-6 lg:p-0
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'var(--color-bg-elevated)',
          borderLeft: '1px solid var(--color-border-light)'
        }}
        aria-label="Table of contents"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4" style={{
          borderBottom: '2px solid var(--color-border-light)'
        }}>
          <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
            <span role="img" aria-hidden="true">📑</span>
            <span>Table of Contents</span>
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] focus-ring"
            aria-label="Close table of contents"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Navigation List */}
        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className={`
                    w-full text-left py-2 px-3 rounded-lg
                    transition-all duration-200
                    focus-ring
                    ${isActive ? 'font-medium' : ''}
                  `}
                  style={{
                    color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
                    background: isActive ? 'var(--color-primary-50)' : 'transparent',
                    borderLeft: isActive ? '3px solid var(--color-primary-500)' : '3px solid transparent'
                  }}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <span className="text-sm line-clamp-2">{heading.text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress Indicator */}
        <div className="mt-6 pt-4" style={{
          borderTop: '1px solid var(--color-border-light)'
        }}>
          <div className="text-xs text-[var(--color-text-tertiary)] mb-2">
            Reading Progress
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                background: 'var(--color-primary-500)',
                width: `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%`
              }}
            />
          </div>
          <div className="text-xs text-[var(--color-text-tertiary)] mt-2 text-right">
            {Math.round(((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100)}%
          </div>
        </div>
      </nav>
    </>
  );
}
