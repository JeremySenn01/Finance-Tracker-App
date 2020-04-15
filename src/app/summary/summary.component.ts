import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ISpending} from '../data.module';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {

  @Input() spendings: ISpending[];
  @Input() startDate: any;
  @Input() endDate: any;

  spendingsCurrentWeek: number;
  spendingsCurrentMonth: number;
  spendingsCurrentYear: number;
  spendingsTotal: number;
  spendingsPast: number;
  spendingsFuture: number;

  constructor() {
  }

  ngOnInit(): void {
    this.calculateValues();
  }

  clearValues(): void {
    this.spendingsTotal = 0;
    this.spendingsCurrentWeek = 0;
    this.spendingsPast = 0;
    this.spendingsFuture = 0;
    this.spendingsCurrentYear = 0;
    this.spendingsCurrentMonth = 0;
    this.spendingsCurrentWeek = 0;
  }

  calculateValues(): void {
    this.clearValues();
    this.spendings.forEach(spending => {
      if (moment(spending.date).isBetween(moment().startOf('week'), moment().endOf('week'), 'day', '[]')) {
        this.spendingsCurrentWeek += spending.amount;
      }
      if (moment(spending.date).isBetween(moment().startOf('month'), moment().endOf('month'), 'day', '[]')) {
        this.spendingsCurrentMonth += spending.amount;
      }
      if (moment(spending.date).isBetween(moment().startOf('year'), moment().endOf('year'), 'day', '[]')) {
        this.spendingsCurrentYear += spending.amount;
      }
      if (moment(spending.date).isAfter(moment(), 'day')) {
        this.spendingsFuture += spending.amount;
      }
      if (moment(spending.date).isBefore(moment())) {
        this.spendingsPast += spending.amount;
      }
      this.spendingsTotal += spending.amount;
    });
  }
}
