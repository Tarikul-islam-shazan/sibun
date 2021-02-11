import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    }),
  };  

  userLoggedIn: boolean = false;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  signIn(data: User): Observable<User> {
    return this.http.post<User>(`${environment.serviceUrl}auth/register`,data,this.httpOptions);
  }

  logIn(data): Observable<User>{
    return this.http.post<User>(`${environment.serviceUrl}auth/login`,data,this.httpOptions);
  }

  logOut(data){
    return this.http.post(`${environment.serviceUrl}auth/logout`,data,this.httpOptions);
  }

  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
