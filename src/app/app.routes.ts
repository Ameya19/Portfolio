import { Routes } from '@angular/router';
import { HomeComponent } from './core/templates/home/home.component';
import { TerminalComponent } from './core/templates/terminal/terminal.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'terminal',
    component: TerminalComponent,
  },
];
