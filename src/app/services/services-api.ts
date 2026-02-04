import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { IService } from '../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServicesApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IService[]> {
    return this.http.get<IService[]>(`${environment.apiUrl}/api/services`)
      .pipe(catchError(() => of([])));
  }

  add(data: Partial<IService>): Observable<IService> {
    return this.http.post<IService>(`${environment.apiUrl}/admin/services`, data);
  }

  update(service: IService): Observable<IService> {
    return this.http.patch<IService>(`${environment.apiUrl}/admin/services/${service.id}`, service);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/services/${id}`);
  }
}
