import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SidebarNav } from './sidebar-nav/sidebar-nav';
import { Header } from './header/header';
import { Breadcrumb } from './breadcrumb/breadcrumb';
import { Table } from './table/table';
import { ResourceTree } from './resource-tree/resource-tree';

@Component({
  selector: 'app-table-design',
  standalone: true,
  imports: [MatButtonModule,SidebarNav,Header,Breadcrumb,Table,ResourceTree],
  templateUrl: './table-design.html',
  styleUrl: './table-design.css'
})
export class TableDesign {
  
}