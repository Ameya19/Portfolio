import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  onPokemonAppClick(event: Event): void {
    event.preventDefault();
    window.open('https://modern-pokedex-psi.vercel.app/', 'Modernized Pokedex');
  }
}
