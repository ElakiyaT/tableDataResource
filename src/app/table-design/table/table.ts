import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  imports: [ CommonModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule
    ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  totalResources = 23;
  resources: any[] = [];

  constructor(private http: HttpClient) {
    // Fetch resources from the public folder
    this.http.get<any[]>('/resources.json').subscribe(data => {
      this.resources = data;
      this.totalResources = data.length;
    });
  }

  export(option: string) {
    if (option === 'CSV') {
      this.exportToCSV(this.resources, 'resources.csv');
    } else if (option === 'PDF') {
      alert('PDF export not implemented yet');
    }
  }

  exportToCSV(data: any[], filename: string) {
    const headers = ['Level', 'Name', 'Type', 'Created', 'Modified', 'Icon'];
    const rows: string[] = [headers.join(',')];

    const queue: { item: any; level: number }[] = data.map(item => ({ item, level: 0 }));

    while (queue.length > 0) {
      const { item, level } = queue.shift()!;

      rows.push([
        `"Level ${level}"`,
        `"${item.name || ''}"`,
        `"${item.type || ''}"`,
        `"${item.created || ''}"`,
        `"${item.modified || ''}"`,
        `"${item.icon || ''}"`
      ].join(','));

      if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          queue.push({ item: child, level: level + 1 });
        }
      }
    }

    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}