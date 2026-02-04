import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadApi {
  constructor(private http: HttpClient) {}

  upload(formData: FormData) {
    return this.http.post<{ url: string }>(`${environment.apiUrl}/admin/upload`, formData);
  }
}
