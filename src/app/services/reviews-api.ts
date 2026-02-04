import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { IReview } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewsApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${environment.apiUrl}/api/reviews`)
      .pipe(catchError(() => of([])));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/admin/reviews/${id}`);
  }

  send(review: Partial<IReview>) {
    return this.http.post<IReview>(`${environment.apiUrl}/api/reviews`, review);
  }
}
