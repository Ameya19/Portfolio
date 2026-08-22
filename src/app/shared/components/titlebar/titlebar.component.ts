import {
  Component,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

interface NavLink {
  label: string;
  fragment: string;
}

@Component({
  selector: 'app-titlebar',
  imports: [],
  templateUrl: './titlebar.component.html',
  styleUrl: './titlebar.component.css',
})
export class TitlebarComponent implements AfterViewInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);

  readonly navLinks: NavLink[] = [
    { label: 'Home', fragment: 'home' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Education', fragment: 'education' },
    { label: 'Projects', fragment: 'projects' },
    { label: 'Contact', fragment: 'contact' },
  ];

  readonly activeSection = signal('home');
  readonly menuOpen = signal(false);

  private scrollSpyObserver?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollSpy();
    }
  }

  ngOnDestroy(): void {
    this.scrollSpyObserver?.disconnect();
  }

  navigateTo(fragment: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.menuOpen.set(false);
    this.activeSection.set(fragment);
    this.scrollToSection(fragment);
    void this.router.navigate([], { fragment, replaceUrl: true });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  toggleTheme(event: Event): void {
    event.stopPropagation();
    this.themeService.toggle();
  }

  private scrollToSection(fragment: string): void {
    if (fragment === 'home') {
      this.scrollToTop();
      return;
    }

    const target = document.getElementById(fragment);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private scrollToTop(): void {
    const top = 0;
    const scroll = () => {
      window.scrollTo({ top, left: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top, left: 0, behavior: 'smooth' });
      document.body.scrollTo({ top, left: 0, behavior: 'smooth' });
    };

    scroll();
    requestAnimationFrame(scroll);
  }

  private setupScrollSpy(): void {
    const sectionIds = this.navLinks.map((link) => link.fragment);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      return;
    }

    this.scrollSpyObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          this.activeSection.set(visible[0].target.id);
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => this.scrollSpyObserver!.observe(section));
  }
}
