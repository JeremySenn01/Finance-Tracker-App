import {Injectable} from '@angular/core';
import {ISpending} from './data.module';
import {SPENDINGS} from './mock-spendings';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpendingService {

  spendings: ISpending[] = SPENDINGS;

  constructor() {
  }

  getSpendings(): Observable<ISpending[]> {
    return of(this.spendings);
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
