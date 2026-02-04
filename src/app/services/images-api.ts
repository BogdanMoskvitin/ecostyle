import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of } from 'rxjs';
import { IImage } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class ImagesApi {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IImage[]> {
    return this.http.get<IImage[]>(`${environment.apiUrl}/api/images`)
      .pipe(catchError(() => of([])));
  }

  add(data: Partial<IImage>): Observable<IImage> {
    return this.http.post<IImage>(
      `${environment.apiUrl}/api/images`,
      data
    );
  }

  update(image: IImage): Observable<IImage> {
    return this.http.patch<IImage>(
      `${environment.apiUrl}/api/images/${image.id}`,
      image
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiUrl}/api/images/${id}`
    );
  }
}
