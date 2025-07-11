import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar-nav.html',
  styleUrl: './sidebar-nav.css'
})
export class SidebarNav {
  isCollapsed = signal(true);

  toggleSidebar() {
    this.isCollapsed.update(v => !v);
  }
}
