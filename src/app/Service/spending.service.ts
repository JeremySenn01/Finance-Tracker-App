import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse, ISpending } from '../data.module';
import { SPENDINGS } from '../mock-spendings';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class SpendingService {

  spendings: ISpending[] = SPENDINGS;
  private spendingsUrl = 'http://localhost:8080/spendings';

  constructor(private http: HttpClient, private loginService: LoginService) {
  }


  getSpendings(): Observable<ISpending[]> {
    const currentUserToken: ILoginResponse = this.loginService.getToken();
    const url = `${this.spendingsUrl}/?userId=${currentUserToken.userId}`;
    return this.http.get<ISpending[]>(url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: currentUserToken.value}),
      },
    );
  }

  addSpending(spending: ISpending): Observable<ISpending> {
    const url = this.spendingsUrl;
    const token = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token.value}),
    };
    return this.http.post<ISpending>(url, spending, options);

  }

  removeSpending(spending: ISpending): Observable<HttpResponse<number>> {
    const url = `${this.spendingsUrl}/${spending.id}`;
    const token = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token.value}),
    };
    return this.http.delete<HttpResponse<number>>(url, options);
  }

  updateSpending(spending: ISpending): Observable<ISpending> {
    const url = this.spendingsUrl;
    const token = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token.value}),
    };
    return this.http.put<ISpending>(url, spending, options);
  }
}
