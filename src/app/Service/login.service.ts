import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginResponse, IUserCredentials } from '../data.module';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  loggedInUser: ILoginResponse;
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
    console.log(credentials);

    return new Promise<ILoginResponse>((resolve, reject) => {
      this.http.post<ILoginResponse>(this.loginUrl, credentials, this.httpOptions)
        .subscribe((response) => {
          this.loggedInUser = { value: response.value, userId: response.userId};
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  getLoggedInUser(): ILoginResponse {
    return this.loggedInUser;
  }

  logout(): void {

  }
}
