import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse, IUserCredentials } from '../data.module';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string): void {
    // TODO: implement register method
  }

  login(email: string, password: string): Promise<ILoginResponse> {
    const credentials: IUserCredentials = { email, password};

    return new Promise<ILoginResponse>((resolve, reject) => {
      this.http.post<ILoginResponse>(this.loginUrl, credentials, this.httpOptions)
        .subscribe((response) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): ILoginResponse {
    const token = localStorage.getItem('token');
    const userId = +localStorage.getItem('userId');
    return { userId, value: token};
  }

  setToken(info: ILoginResponse) {
    localStorage.setItem('token', info.value);
    localStorage.setItem('userId', info.userId.toString());
  }

  logout(): void {

  }
}
