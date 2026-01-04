import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get<any>(`${environment.apiUrl}/api/services?populate=*`).pipe(
      catchError(error => {
        console.error('API error: ', error);
        return of({ data: [] });
      })
    );
  }

  getImages() {
    return this.http.get<any>(`${environment.apiUrl}/api/images?populate=*`).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }

  getReviews() {
    return this.http.get<any>(`${environment.apiUrl}/api/reviews`, {
      params: {
        'sort': 'createdAt:desc',
        'pagination[limit]': 3
      }
    }).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }

  getFilters() {
    return this.http.get<any>(`${environment.apiUrl}/api/filters`).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }

  getGeneral() {
    return this.http.get<any>(`${environment.apiUrl}/api/general?populate=*`).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }

  sendRequest(formData: any) {
    return this.http.post(`${environment.apiUrl}/api/requests`, { data: formData }).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }

  sendReview(formData: any) {
    return this.http.post(`${environment.apiUrl}/api/reviews`, { data: formData }).pipe(
      catchError(error => {
        console.error('API error: ', error);
         return of({ data: [] });
      })
    );
  }
}
