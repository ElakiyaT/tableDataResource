import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Resource {
  private resourceUrl = '/resources.json';

  constructor(private http: HttpClient) {}

  getResources(): Observable<any[]> {
    return this.http.get<any[]>(this.resourceUrl);
  }
}
