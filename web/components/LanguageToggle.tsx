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

  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        onClick={() => handleModeChange('english')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          mode === 'english'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => handleModeChange('both')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          mode === 'both'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        English | 한국어
      </button>
    </div>
  );
}
