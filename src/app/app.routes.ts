import { Routes } from '@angular/router';

import { Calculator } from './pages/calculator/calculator';
import { ToDo } from './pages/to-do/to-do';
import { ApiGet } from './pages/api-get/api-get';
import { StudentsPage } from './pages/students-page/students-page';
import { StudentsFormPage } from './pages/students-form-page/students-form-page';
import { LoginPage } from './pages/login-page/login-page';

import { authGuard } from './guards/auth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full',
  },
  {
    path: 'calculator',
    component: Calculator,
  },
  {
    path: 'todo',
    component: ToDo,
  },
  {
    path: 'api-get',
    component: ApiGet,
  },
  {
    path: 'students',
    component: StudentsPage,
  },
  {
    path: 'students/form',
    component: StudentsFormPage,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '**',
    redirectTo: 'calculator',
  },
];