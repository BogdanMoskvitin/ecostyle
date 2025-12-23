import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private api = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  getServices() {
    return this.http.get<any>(`${this.api}/services?populate=*`);
  }

  getImages() {
    return this.http.get<any>(`${this.api}/images?populate=*`);
  }

  getReviews() {
    return this.http.get<any>(`${this.api}/reviews`, {
      params: {
        'sort': 'createdAt:desc',
        'pagination[limit]': 3
      }
    });
  }

  getFilters() {
    return this.http.get<any>(`${this.api}/filters`);
  }

  getGeneral() {
    return this.http.get<any>(`${this.api}/general?populate=*`);
  }

  sendRequest(formData: any) {
    return this.http.post(`${this.api}/requests`, { data: formData });
  }

  sendReview(formData: any) {
    return this.http.post(`${this.api}/reviews`, { data: formData });
  }
}
