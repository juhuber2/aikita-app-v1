import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.html',
  styleUrl: './left-sidebar.css',
})
export class LeftSidebar {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

  items = [
    { routeLink: 'dashboard', icon: 'fa-solid fa-house', label: 'Dashboard' },
    { routeLink: 'page1', icon: 'fa-solid fa-children', label: 'Page 1'},
    { routeLink: 'page2', icon: 'fa-solid fa-children', label: 'Page 2'},
    { routeLink: 'settings', icon: 'fa-solid fa-gear', label: 'Settings' },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}