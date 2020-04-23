import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpending } from '../data.module';
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
    const token: string = this.loginService.getToken();
    return this.http.get<ISpending[]>(this.spendingsUrl, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token}),
      },
    );
  }

  addSpending(spending: ISpending): Observable<HttpResponse<ISpending>> {
    const url = this.spendingsUrl;
    const token: string = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token}),
    };
    return this.http.post<ISpending>(url, spending, { observe: 'response', headers: options.headers});
  }

  removeSpending(spending: ISpending): Observable<HttpResponse<number>> {
    const url = `${this.spendingsUrl}/${spending.id}`;
    const token: string = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token}),
    };
    return this.http.delete<HttpResponse<number>>(url, options);
  }

  updateSpending(spending: ISpending): Observable<HttpResponse<ISpending>> {
    const url = this.spendingsUrl;
    const token: string = this.loginService.getToken();
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: token}),
    };
    return this.http.put<ISpending>(url, spending, { observe: 'response', headers: options.headers});
  }
}
