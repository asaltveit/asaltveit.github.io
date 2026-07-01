'use client';

import { useEffect } from 'react';

function getStoredTheme(): string | null {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

function applySystemTheme(): void {
  applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function applyStoredOrSystemTheme(): void {
  const stored = getStoredTheme();
  if (stored === 'dark' || stored === 'light') {
    applyTheme(stored);
    return;
  }
  applySystemTheme();
}

export default function SystemThemeSync() {
  useEffect(() => {
    applyStoredOrSystemTheme();

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const onSystemThemeChange = () => {
      if (getStoredTheme()) return;
      applySystemTheme();
    };

    media.addEventListener('change', onSystemThemeChange);
    return () => media.removeEventListener('change', onSystemThemeChange);
  }, []);

  return null;
}
