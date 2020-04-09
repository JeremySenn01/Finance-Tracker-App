import {Component, OnInit} from '@angular/core';
import {SpendingService} from '../spending.service';
import {ETimeUnit, ISpending} from '../data.module';
import * as moment from 'moment';

@Component({
  selector: 'app-spending-overview',
  templateUrl: './spending-overview.component.html',
  styleUrls: ['./spending-overview.component.css']
})
export class SpendingOverviewComponent implements OnInit {

  spendings: ISpending[];
  filteredSpendings: ISpending[];
  timeUnit: ETimeUnit = ETimeUnit.MONTH;
  TimeUnitEnum = ETimeUnit;

  constructor(private spendingService: SpendingService) {
  }

  ngOnInit(): void {
    this.getSpendings();
  }

  getSpendings(): void {
    this.spendingService.getSpendings().subscribe(spendings => this.spendings = spendings);
    this.filteredSpendings = this.spendings;
  }

  setTimeUnit(timeUnit: ETimeUnit): void {
    this.timeUnit = timeUnit;
    this.filterSpendings();
  }

  filterSpendings(): void {
    let filteredSpendings: ISpending[] = [];
    if (this.timeUnit === ETimeUnit.WEEK) {
      const weekOfYear = moment().format('W');
      filteredSpendings = this.spendings.filter(s => moment(s.date).format('W') === weekOfYear);
    } else if (this.timeUnit === ETimeUnit.MONTH) {
      const monthOfYear = moment().format('M');
      filteredSpendings = this.spendings.filter(s => moment(s.date).format('M') === monthOfYear);
    } else if (this.timeUnit === ETimeUnit.YEAR) {
      const year = moment().format('Y');
      filteredSpendings = this.spendings.filter(s => moment(s.date).format('Y') === year);
    }
    this.filteredSpendings = filteredSpendings;
  }

}
