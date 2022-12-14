import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  postUser(user: any): Observable<void> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.http.post<void>(`${environment.apiBaseUrl}/api/auth/login`, body, {
      'headers': headers
    })
  }
}
