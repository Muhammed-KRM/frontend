import { Routes } from '@angular/router';
import { HomeComponent } from './components/modules/Home/home.component';
import { AboutComponent } from './components/modules/about/about.component';
import { ManagementComponent } from './components/modules/management/management.component';
import { AsmaevComponent } from './components/modules/asmaev/asmaev.component';
import { MarinyatComponent } from './components/modules/marinyat/marinyat.component';
import { ProjectsComponent } from './components/modules/projects/projects.component';
import { ContactComponent } from './components/modules/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Ana Sayfa'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Hakkımızda'
  },
  {
    path: 'management',
    component: ManagementComponent,
    title: 'Yönetim Kurulu'
  },
  {
    path: 'asmaev',
    component: AsmaevComponent,
    title: 'Asmalı Ev (Bağ Evi)'
  },
  {
    path: 'marinyat',
    component: MarinyatComponent,
    title: 'Marin Yat'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    title: 'Projeler'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'İletişim'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
