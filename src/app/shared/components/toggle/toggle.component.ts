import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  isEducation = true;   // true → Education, false → Certifications
  isMoving = false;

  @Output() educationToggled = new EventEmitter<boolean>();

  onToggle(event: MouseEvent): void {
    event.preventDefault();

    this.isEducation = !this.isEducation;
    this.isMoving = true;

    this.educationToggled.emit(this.isEducation);

    setTimeout(() => {
      this.isMoving = false;
    }, 200);
  }
}

