import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { IFilter } from '../models/filter';

@Injectable({
  providedIn: 'root',
})
export class FiltersApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IFilter[]> {
    return this.http.get<IFilter[]>(`${environment.apiUrl}/api/filters`);
  }

  add(data: Partial<IFilter>): Observable<IFilter> {
    return this.http.post<IFilter>(`${environment.apiUrl}/api/filters`, data);
  }

  update(filter: IFilter): Observable<IFilter> {
    return this.http.patch<IFilter>(`${environment.apiUrl}/api/filters/${filter.id}`, filter)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/filters/${id}`)
  }
}
