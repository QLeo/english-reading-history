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

  const getButtonStyles = (isActive: boolean) => {
    if (isActive) {
      return {
        background: 'var(--color-bg-elevated)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
        fontWeight: '500'
      };
    }
    return {
      background: 'transparent',
      color: 'var(--color-text-tertiary)',
      border: '1px solid transparent',
      fontWeight: '400'
    };
  };

  return (
    <div
      className="inline-flex items-center gap-1 p-1 rounded-lg"
      style={{
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)'
      }}
      role="group"
      aria-label="Language display mode"
    >
      <button
        onClick={() => handleModeChange('english')}
        className="px-4 py-2 rounded-md text-sm transition-all focus-ring"
        style={getButtonStyles(mode === 'english')}
        aria-pressed={mode === 'english'}
        aria-label="Show English only"
      >
        English
      </button>

      <button
        onClick={() => handleModeChange('both')}
        className="px-4 py-2 rounded-md text-sm transition-all focus-ring whitespace-nowrap"
        style={getButtonStyles(mode === 'both')}
        aria-pressed={mode === 'both'}
        aria-label="Show both English and Korean"
      >
        English | 한국어
      </button>
    </div>
  );
}
