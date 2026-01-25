import { Component } from '@angular/core';
import { TitlebarComponent } from "../../../shared/components/titlebar/titlebar.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  imports: [TitlebarComponent, MatButtonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  //Page about skillset

}
