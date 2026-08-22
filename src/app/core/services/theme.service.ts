import { Injectable, signal } from '@angular/core';

export type Theme = 'dark' | 'neon';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'portfolio-theme';
  readonly theme = signal<Theme>('dark');

  constructor() {
    this.applyTheme(this.getStoredTheme());
  }

  toggle(): void {
    this.setTheme(this.theme() === 'dark' ? 'neon' : 'dark');
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
    localStorage.setItem(this.storageKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'neon' ? 'neon' : 'dark';
  }

  private applyTheme(theme: Theme): void {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}
