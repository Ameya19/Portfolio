import { Component, AfterViewInit } from '@angular/core';
import { TitlebarComponent } from "../../../shared/components/titlebar/titlebar.component";
import { MatButtonModule } from '@angular/material/button';
import { AboutComponent } from "../about/about.component";
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ContactComponent } from '../contact/contact.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [TitlebarComponent, MatButtonModule, AboutComponent, ExperienceComponent, EducationComponent, ProjectsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router){ }

  ngAfterViewInit(): void {

    class TxtType {
      private txt = '';
      private loopNum = 0;
      private isDeleting = false;

      constructor(
        private span: HTMLElement,
        private words: string[],
        private period: number
      ) {
        this.tick();
      }

      tick() {
        const current = this.loopNum % this.words.length;
        const fullTxt = this.words[current];

        // Fixed speeds (NO randomness)
        const TYPING_SPEED = 120;
        const DELETING_SPEED = 70;
        const START_PAUSE = 400;

        this.txt = this.isDeleting
          ? fullTxt.slice(0, this.txt.length - 1)
          : fullTxt.slice(0, this.txt.length + 1);

        // 🔑 NO innerHTML — only text update
        this.span.textContent = this.txt;

        let delay = this.isDeleting ? DELETING_SPEED : TYPING_SPEED;

        if (!this.isDeleting && this.txt === fullTxt) {
          delay = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delay = START_PAUSE;
        }

        setTimeout(() => this.tick(), delay);
      }
    }

    // Init
    const elements = document.querySelectorAll('.typewrite');

    elements.forEach((el) => {
      const rawType = el.getAttribute('data-type');
      const period = Number(el.getAttribute('data-period')) || 1500;

      if (!rawType) return;

      const words = JSON.parse(rawType);
      const span = el.querySelector('.wrap') as HTMLElement;

      if (span) {
        new TxtType(span, words, period);
      }
    });
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = '/assets/Ameya_Bhingarkar_Resume.pdf';
    link.download = 'Ameya_Bhingarkar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onContactClick(){
    this.router.navigate([], { fragment : 'contact'});
  }
}
