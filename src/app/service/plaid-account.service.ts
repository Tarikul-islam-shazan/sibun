import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaidLinkToken } from '../model/plaidLinkToken.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaidAccountService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) { }

  plaidCreateLinkToken(): Observable<PlaidLinkToken> {
    return this.http.post<PlaidLinkToken>(`${environment.localServiceUrl}api/create_link_token`,'',this.httpOptions);
  }
  plaidSetAccessToken(data){
    return this.http.post(`${environment.localServiceUrl}api/set_access_token`,data,this.httpOptions);
  }
  plaidGetAccount(data){
    return this.http.get(`${environment.localServiceUrl}api/accounts`+`?${data}`);
  }
}
