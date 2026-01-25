import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  onPokeDexClick(event: Event): void {
    event.preventDefault();
    window.open('https://pokedex-pearl-ten.vercel.app/', 'Pokedex');
  }
}
