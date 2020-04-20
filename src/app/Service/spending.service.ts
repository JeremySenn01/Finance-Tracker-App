import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const loggedInUser: ILoginResponse = this.loginService.getLoggedInUser();
    if (loggedInUser) {
      const url = `${this.spendingsUrl}/?userId=${loggedInUser.userId}`;
      return this.http.get<ISpending[]>(url, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: loggedInUser.value}),
        },
      );
    }
    console.log('authToken not around boi');
    return of([]);
  }

  addSpending(spending: ISpending): Observable<ISpending> {
    this.spendings.push(spending);
    return of(spending);
  }

  removeSpending(spending: ISpending): Observable<ISpending> {
    const index = this.spendings.indexOf(spending);
    this.spendings.splice(index, 1);
    return of(spending);
  }

  updateSpending(spending: ISpending): Observable<ISpending> {
    const index = this.spendings.findIndex(s => s.id === spending.id);
    this.spendings[index] = spending;
    return of(spending);
  }
}
