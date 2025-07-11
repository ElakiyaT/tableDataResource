import { Routes } from '@angular/router';
import { TableDesign } from './table-design/table-design';

export const routes: Routes = [
    { path: '', redirectTo: 'settings', pathMatch: 'full' },
    { path: 'settings', component: TableDesign }, // only valid route
    { path: '**', component: TableDesign }  
  ];