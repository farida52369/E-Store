import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  postUser1(): Observable<void> {
   
   
    return this.http.get<void>(`${environment.apiBaseUrl}/api/auth/current`, {
     responseType: 'Object' as 'json' 
    })
  }
}
