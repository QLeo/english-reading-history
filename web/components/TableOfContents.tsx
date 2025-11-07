'use client';

import { useEffect, useState } from 'react';
import type { HeadingItem } from '@/lib/types';

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate scroll progress (0-100)
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    handleScroll(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-hover)',
          color: 'var(--color-text-primary)'
        }}
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="6" x2="17" y2="6" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14" x2="17" y2="14" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
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
          w-80 lg:w-64
          max-h-screen lg:max-h-[calc(100vh-4rem)]
          overflow-y-auto
          z-40 lg:z-auto
          p-6 lg:p-4
          transition-transform duration-200
          ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        style={{
          background: 'var(--color-bg-elevated)',
          borderLeft: '1px solid var(--color-border)'
        }}
        aria-label="Table of contents"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4" style={{
          borderBottom: '1px solid var(--color-border)'
        }}>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Contents
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-bg-secondary)] focus-ring"
            aria-label="Close table of contents"
          >
            ✕
          </button>
        </div>

        {/* Navigation List */}
        <ul className="space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li
                key={heading.id}
                style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className="w-full text-left py-2 px-3 rounded-md text-sm transition-all focus-ring"
                  style={{
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    background: isActive ? 'var(--color-bg-secondary)' : 'transparent',
                    fontWeight: isActive ? '500' : '400'
                  }}
                  aria-current={isActive ? 'location' : undefined}
                >
                  {heading.text}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress Indicator */}
        <div className="mt-6 pt-4" style={{
          borderTop: '1px solid var(--color-border)'
        }}>
          <div className="text-xs mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Progress
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--color-bg-secondary)' }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                background: 'var(--color-primary)',
                width: `${scrollProgress}%`
              }}
            />
          </div>
          <div className="text-xs mt-2 text-right" style={{ color: 'var(--color-text-tertiary)' }}>
            {Math.round(scrollProgress)}%
          </div>
        </div>
      </nav>
    </>
  );
}
