import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  _url = '';
  constructor(private http: HttpClient) {}
  enroll(user: any) {
    return this.http.post(this._url, user);
  }
}
