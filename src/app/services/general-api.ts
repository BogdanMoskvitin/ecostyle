import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { IMainInfo } from '../models/general';

@Injectable({
  providedIn: 'root',
})
export class GeneralApi {
  constructor(private http: HttpClient) {}

  get(): Observable<IMainInfo> {
    return this.http.get<IMainInfo>(`${environment.apiUrl}/api/general`)
      .pipe(catchError(() => of({
        title: '',
        subtitle: '',
        aboutText: '',
        aboutImageUrl: ''
      })));
  }

  update(data: IMainInfo) {
    return this.http.put<IMainInfo>(`${environment.apiUrl}/admin/general`, data);
  }
}
