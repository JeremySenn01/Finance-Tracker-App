import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { EOperation, ETimeUnit, IDialogProps, ISpending } from '../data.module';
import { HelpComponent } from '../help/help.component';
import { NewSpendingComponent } from '../new-spending/new-spending.component';
import { LoginService } from '../Service/login.service';
import { SpendingService } from '../Service/spending.service';

@Component({
  selector: 'app-spending-overview',
  templateUrl: './spending-overview.component.html',
  styleUrls: ['./spending-overview.component.css'],
})
export class SpendingOverviewComponent implements OnInit {

  spendings: ISpending[] = [];
  filteredSpendings: ISpending[] = [];
  timeUnit: ETimeUnit = ETimeUnit.MONTH;
  TimeUnitEnum = ETimeUnit;
  selectedWeek: number;
  selectedMonth: number;
  selectedYear: number;
  startDate: any;
  endDate: any;

  constructor(private spendingService: SpendingService,
              private loginService: LoginService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.setCurrentDate();
    this.getSpendings();
  }

  getSpendings(): void {
    this.spendingService.getSpendings().subscribe(spendings => {
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
      if (result) {
        this.getSpendings();
      }
    });
  }

  openHelp(): void {
    this.dialog.open(HelpComponent, {
      height: '400px',
      width: '400px',
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  setTimeUnit(timeUnit: ETimeUnit): void {
    this.timeUnit = timeUnit;
    this.setCurrentDate();
    this.filterSpendings();
  }

  filterSpendings(): void {
    this.filteredSpendings = this.spendings.filter(s => moment(s.date).isBetween(this.startDate, this.endDate, 'day', '[]'));
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
