import { Component } from '@angular/core';
import { ToggleComponent } from '../../../shared/components/toggle/toggle.component';

@Component({
  selector: 'app-education',
  imports: [ToggleComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css',
})
export class EducationComponent {
  activeView: 'education' | 'certifications' = 'education';

  toggleValue(isEducation: boolean): void {
    this.activeView = isEducation ? 'education' : 'certifications';
  }
}
