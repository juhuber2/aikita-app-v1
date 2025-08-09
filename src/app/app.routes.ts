import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Page1 } from './page1/page1';
import { Settings } from './settings/settings';
import { Page2 } from './page2/page2';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'page1', component: Page1  },
  { path: 'settings', component: Settings },
  { path: 'page2', component: Page2 },
];