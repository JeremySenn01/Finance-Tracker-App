import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { ISpending } from '../data.module';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() spendings: ISpending[] = [];

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

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateValues();
  }

  clearValues(): void {
    this.spendingsTotal = 0;
    this.spendingsPast = 0;
    this.spendingsFuture = 0;
    this.spendingsCurrentYear = 0;
    this.spendingsCurrentMonth = 0;
    this.spendingsCurrentWeek = 0;
  }

  calculateValues(): void {
    this.clearValues();
    this.spendings.forEach(spending => {
      if (moment(spending.date).isBetween(moment().startOf('week'), moment().endOf('week'), 'h', '[]')) {
        this.spendingsCurrentWeek += spending.amount;
      }
      if (moment(spending.date).isBetween(moment().startOf('month'), moment().endOf('month'), 'h', '[]')) {
        this.spendingsCurrentMonth += spending.amount;
      }
      if (moment(spending.date).isBetween(moment().startOf('year'), moment().endOf('year'), 'h', '[]')) {
        this.spendingsCurrentYear += spending.amount;
      }
      if (moment(spending.date).isAfter(moment(), 'h')) {
        this.spendingsFuture += spending.amount;
      } else if (moment(spending.date).isBefore(moment())) {
        this.spendingsPast += spending.amount;
      }
      this.spendingsTotal += spending.amount;
    });
  }
}
