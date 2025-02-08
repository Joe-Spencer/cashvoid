import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'chat', component: ChatComponent },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: 'images', loadComponent: () => import('./components/images/images.component').then(m => m.ImagesComponent) }
];
