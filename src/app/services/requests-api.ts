import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsApi {
  constructor(private http: HttpClient) {}

  sendRequest(formData: any) {
    return this.http.post(`${environment.apiUrl}/api/requests`, { data: formData }).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }
}
