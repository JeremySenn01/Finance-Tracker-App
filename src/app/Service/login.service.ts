import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IUserCredentials } from '../data.module';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
  }

  authenticate(email: string, password: string, register: boolean = false): Promise<string> {
    const credentials: IUserCredentials = { email, password};

    return new Promise<string>((resolve, reject) => {
      const action = register ?
        this.http.put<{ value: string }>(this.loginUrl, credentials, this.httpOptions) :
        this.http.post<{ value: string }>(this.loginUrl, credentials, this.httpOptions);

      action.subscribe((response) => {
        resolve(response.value);
      }, (error) => {
        reject(error);
      });
    });
  }

  logout(): Observable<any> {
    return this.http.delete<any>(this.loginUrl, {
      headers: new HttpHeaders({ Authorization: this.getToken()}),
      observe: 'response',
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}
