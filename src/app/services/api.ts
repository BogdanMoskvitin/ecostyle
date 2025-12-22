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
    return this.http.get<any>(`${this.api}/reviews`);
  }

  getFilters() {
    return this.http.get<any>(`${this.api}/filters`);
  }

  getGeneral() {
    return this.http.get<any>(`${this.api}/general?populate=*`);
  }
}
