import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  postUserr(user: any): Observable<String> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post<string>(`${environment.apiBaseUrl}/api/auth/register`, user,
      { headers, responseType: 'text' as 'json' });
  }

}
