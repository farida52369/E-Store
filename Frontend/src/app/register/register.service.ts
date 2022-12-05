import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  postUser(user: any): Observable<string> {

    const headers = { 'content-type': 'application/json'};
 return this.http.post<string>(`${environment.apiBaseUrl}/api/auth/register`, user, 
 { headers, responseType: 'text' as 'json'  });
 
  }
}
