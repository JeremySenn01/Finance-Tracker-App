import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
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

  register(email: string, password: string): void {
    // TODO: implement register method
  }

  login(email: string, password: string): Promise<string> {
    const credentials: IUserCredentials = { email, password};

    return new Promise<string>((resolve, reject) => {
      this.http.post<{ value: string }>(this.loginUrl, credentials, this.httpOptions)
        .subscribe((response) => {
          resolve(response.value);
        }, (error) => {
          reject(error);
        });
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

  logout(): void {

  }
}
