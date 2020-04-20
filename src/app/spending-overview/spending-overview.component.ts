import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EOperation, ETimeUnit, IDialogProps, ISpending } from '../data.module';
import { NewSpendingComponent } from '../new-spending/new-spending.component';
import { LoginService } from '../Service/login.service';
import { SpendingService } from '../Service/spending.service';

@Component({
  selector: 'app-spending-overview',
  templateUrl: './spending-overview.component.html',
  styleUrls: ['./spending-overview.component.css'],
})
export class SpendingOverviewComponent implements OnInit {

  spendings: ISpending[];
  filteredSpendings: ISpending[];
  timeUnit: ETimeUnit = ETimeUnit.MONTH;
  TimeUnitEnum = ETimeUnit;
  selectedWeek: number;
  selectedMonth: number;
  selectedYear: number;
  startDate: any;
  endDate: any;

  constructor(private spendingService: SpendingService,
              private loginService: LoginService,
              public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.loginService.loggedInUser) {
      this.router.navigate(['login']);
    }
    this.setCurrentDate();
    this.getSpendings();
  }

  getSpendings(): void {
    this.spendingService.getSpendings().subscribe(spendings => {
      console.log('loaded: ', spendings);
      this.spendings = spendings;
      this.filterSpendings();
    });
  }

  newSpending(): void {
    const spendingProps: IDialogProps = { spending: null, operation: EOperation.NEW};
    const dialogRef = this.dialog.open(NewSpendingComponent, {
      data: spendingProps,
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.spendingService.addSpending(result);
    });
  }

  setTimeUnit(timeUnit: ETimeUnit): void {
    this.timeUnit = timeUnit;
    this.setCurrentDate();
    this.filterSpendings();
  }

  filterSpendings(): void {
    this.filteredSpendings = this.spendings.filter(s => moment(s.date).isBetween(this.startDate, this.endDate, 'day', '[]'));
    console.log('filtered: ', moment(new Date().getMilliseconds()), this.startDate);
  }

  forward() {
    if (this.timeUnit === ETimeUnit.WEEK) {
      this.selectedWeek++;
    } else if (this.timeUnit === ETimeUnit.MONTH) {
      this.selectedMonth++;
    } else if (this.timeUnit === ETimeUnit.YEAR) {
      this.selectedYear++;
    }
    this.generateDate();
    this.filterSpendings();
  }

  back() {
    if (this.timeUnit === ETimeUnit.WEEK) {
      this.selectedWeek--;
    } else if (this.timeUnit === ETimeUnit.MONTH) {
      this.selectedMonth--;
    } else if (this.timeUnit === ETimeUnit.YEAR) {
      this.selectedYear--;
    }
    this.generateDate();
    this.filterSpendings();
  }

  generateDate(): void {

    let startDate;
    let endDate;
    if (this.timeUnit === ETimeUnit.WEEK) {
      startDate = moment().day('Monday').year(this.selectedYear).week(this.selectedWeek);
      endDate = moment().day('Sunday').year(this.selectedYear).week(this.selectedWeek + 1);
    } else if (this.timeUnit === ETimeUnit.MONTH) {
      startDate = moment().year(this.selectedYear).month(this.selectedMonth).startOf('month');
      endDate = moment(startDate).endOf('month');
    } else if (this.timeUnit === ETimeUnit.YEAR) {
      startDate = moment().year(this.selectedYear).month(0).startOf('month');
      endDate = moment(startDate).endOf('year');
    }
    this.startDate = startDate;
    this.endDate = endDate;
  }

  setCurrentDate(): void {
    this.selectedWeek = +moment().format('W');
    this.selectedMonth = +moment().format('M') - 1;
    this.selectedYear = +moment().format('Y');
    this.generateDate();
  }

}