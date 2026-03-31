import { Component } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-experience',
  imports: [MatSlideToggleModule, CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
  animations: [
    trigger('contentAnim', [

      // Smooth entry
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ]),

      // Smooth exit
      transition(':leave', [
        animate(
          '300ms cubic-bezier(0.4, 0.0, 1, 1)',
          style({ opacity: 0, transform: 'translateY(-20px)' })
        )
      ])
    ])
  ]
})
export class ExperienceComponent {
  activeView: 'details' | 'skills' = 'details';

  toggleValue(isExperience: boolean): void {
    this.activeView = isExperience ? 'details' : 'skills';
  }

}
