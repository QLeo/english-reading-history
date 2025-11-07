'use client';

import { useState } from 'react';

export type DisplayMode = 'english' | 'korean' | 'both';

interface LanguageToggleProps {
  onModeChange: (mode: DisplayMode) => void;
}

export default function LanguageToggle({ onModeChange }: LanguageToggleProps) {
  const [mode, setMode] = useState<DisplayMode>('english');

  const handleModeChange = (newMode: DisplayMode) => {
    setMode(newMode);
    onModeChange(newMode);
  };

  const buttonBaseStyles = "px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 focus-ring";

  const getButtonStyles = (isActive: boolean) => {
    if (isActive) {
      return {
        background: 'var(--color-bg-elevated)',
        color: 'var(--color-primary-600)',
        boxShadow: 'var(--shadow-md)',
        border: '2px solid var(--color-primary-400)'
      };
    }
    return {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: '2px solid transparent'
    };
  };

  return (
    <div
      className="inline-flex items-center gap-1 p-1.5 sm:p-2 rounded-xl"
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border-light)'
      }}
      role="group"
      aria-label="Language display mode"
    >
      <button
        onClick={() => handleModeChange('english')}
        className={buttonBaseStyles}
        style={getButtonStyles(mode === 'english')}
        aria-pressed={mode === 'english'}
        aria-label="Show English only"
      >
        <span className="flex items-center gap-2">
          <span className="text-base sm:text-lg" role="img" aria-hidden="true">🇬🇧</span>
          <span>English</span>
        </span>
      </button>

      <button
        onClick={() => handleModeChange('both')}
        className={buttonBaseStyles}
        style={getButtonStyles(mode === 'both')}
        aria-pressed={mode === 'both'}
        aria-label="Show both English and Korean"
      >
        <span className="flex items-center gap-2">
          <span className="hidden sm:inline text-base sm:text-lg" role="img" aria-hidden="true">🌐</span>
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">English | 한국어</span>
            <span className="sm:hidden">Both</span>
          </span>
        </span>
      </button>

      <button
        onClick={() => handleModeChange('korean')}
        className={buttonBaseStyles}
        style={getButtonStyles(mode === 'korean')}
        aria-pressed={mode === 'korean'}
        aria-label="Show Korean only"
      >
        <span className="flex items-center gap-2">
          <span className="text-base sm:text-lg" role="img" aria-hidden="true">🇰🇷</span>
          <span>한국어</span>
        </span>
      </button>
    </div>
  );
}
