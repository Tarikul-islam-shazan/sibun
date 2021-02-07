import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    }),
  };  

  constructor(private http: HttpClient) { }

  signIn(data: User): Observable<User> {
    return this.http.post<User>(`${environment.serviceUrl}auth/register`,data,this.httpOptions);
  }

  logIn(data): Observable<User>{
    return this.http.post<User>(`${environment.serviceUrl}auth/login`,data,this.httpOptions);
  }
}
