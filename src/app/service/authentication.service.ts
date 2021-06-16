import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService,private storage: Storage) { }

  signIn(data: User): Observable<User> {
    return this.http.post<User>(`${environment.serviceUrl}auth/register`,data,this.httpOptions);
  }

  logIn(data): Observable<User>{
    return this.http.post<User>(`${environment.serviceUrl}auth/login`,data,this.httpOptions);
  }

  logOut(data){
    return this.http.post(`${environment.serviceUrl}auth/logout`,data);
  }

  async isAuthenticated(): Promise<boolean>{
    const token = await this.storage.get('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
