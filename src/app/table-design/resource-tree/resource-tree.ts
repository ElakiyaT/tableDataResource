import { Component, OnInit } from '@angular/core';
import { Resource } from '../../resource';
import { CommonModule } from '@angular/common';
import { Pagination } from '../pagination/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-tree',
  imports: [CommonModule,Pagination],
  standalone: true,
  templateUrl: './resource-tree.html',
  styleUrl: './resource-tree.css'
})
export class ResourceTree implements OnInit {
  allResources: any[] = [];
  displayedResources: any[] = [];

  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  expandedMap: { [key: string]: boolean } = {};
  selectedMap: { [key: string]: boolean } = {};
  selectAll: boolean = false;

  constructor(private resourceService: Resource,private router: Router) {}

  ngOnInit(): void {
    this.resourceService.getResources().subscribe({
      next: (data) => {
        console.log('API call successful. Data received:', data);
        this.allResources = data;
        this.totalPages = Math.ceil(this.allResources.length / this.pageSize);
        this.updateDisplayedResources();
      },
      error: (err) => {
        console.error('Failed to load resources:', err);
      }
    });
  }

  updateDisplayedResources(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedResources = this.allResources.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedResources();
  }

  toggle(resource: any): void {
    const key = this.getResourceKey(resource);
    this.expandedMap[key] = !this.expandedMap[key];
  }

  isExpanded(resource: any): boolean {
    return this.expandedMap[this.getResourceKey(resource)];
  }

  getResourceKey(resource: any): string {
    return resource.id || resource.name;
  }

  toggleSelectAll(): void {
    this.selectAll = !this.selectAll;
    this.applySelectionToAll(this.allResources, this.selectAll);
  }

  applySelectionToAll(resources: any[], selected: boolean): void {
    for (const res of resources) {
      const key = this.getResourceKey(res);
      this.selectedMap[key] = selected;
      if (res.children?.length) {
        this.applySelectionToAll(res.children, selected);
      }
    }
  }

  isSelected(resource: any): boolean {
    return this.selectedMap[this.getResourceKey(resource)] || false;
  }

  toggleSingleSelection(resource: any, event: any): void {
    const key = this.getResourceKey(resource);
    this.selectedMap[key] = event.target.checked;

    // Update selectAll flag when user deselects a single row
    if (!event.target.checked) {
      this.selectAll = false;
    } else {
      this.selectAll = this.areAllRowsSelected();
    }
  }

  areAllRowsSelected(): boolean {
    const allKeys: string[] = [];
    const collectKeys = (resources: any[]) => {
      for (const res of resources) {
        const key = this.getResourceKey(res);
        allKeys.push(key);
        if (res.children?.length) {
          collectKeys(res.children);
        }
      }
    };
    collectKeys(this.allResources);

    return allKeys.every((key) => this.selectedMap[key]);
  }
  sortColumn: string = '';
sortDirection: 'asc' | 'desc' = 'asc';

sortBy(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  this.sortResources();
  this.updateDisplayedResources(); 
}

sortResources(): void {
  const getValue = (obj: any, key: string): any => {
    const val = obj[key] || '';
    if (key === 'created' || key === 'modified') {
      return new Date(val).getTime(); // convert to timestamp for proper sorting
    }
    return val.toString().toLowerCase(); // default string comparison
  };

  const sortFn = (a: any, b: any) => {
    const valA = getValue(a, this.sortColumn);
    const valB = getValue(b, this.sortColumn);

    if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;
  };

  const sortRecursive = (resources: any[]) => {
    resources.sort(sortFn);
    for (const res of resources) {
      if (res.children?.length) {
        sortRecursive(res.children);
      }
    }
  };

  sortRecursive(this.allResources);
}

isSettingsRoute(): boolean {
  return this.router.url === '/settings';
}

}