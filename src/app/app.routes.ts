import { Routes } from '@angular/router';
import { HomeComponent } from './core/templates/home/home.component';
import { AboutComponent } from './core/templates/about/about.component';
import { ContactComponent } from './core/templates/contact/contact.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];
