import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EOperation, ESpendingType, IDialogProps, ISpending } from '../data.module';

@Component({
  selector: 'app-new-spending',
  templateUrl: './new-spending.component.html',
  styleUrls: ['./new-spending.component.css'],
})
export class NewSpendingComponent implements OnInit {

  currentSpending: ISpending;
  selectedDate;
  dialogTitle: string;
  amount: number;
  description: string;
  error: string;
  success: string;

  constructor(public dialogRef: MatDialogRef<NewSpendingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IDialogProps) {
  }

  ngOnInit(): void {
    // Parameter received
    if (this.data) {
      if (this.data.operation === EOperation.NEW) {
        this.currentSpending = this.initNewSpending();
        this.dialogTitle = 'New Spending';
        this.selectedDate = new Date();
      } else {
        this.currentSpending = this.data.spending;
        this.dialogTitle = 'Edit Spending';
        this.selectedDate = this.currentSpending.date;
      }
    }
  }

  onSave(): void {
    // Valid Result
    if (this.selectedDate && this.amount && this.description) {
      this.currentSpending.date = this.selectedDate;
      this.currentSpending.amount = this.amount;
      this.currentSpending.description = this.description;
      this.success = 'success';
      this.error = '';
      setTimeout(() => {
        this.dialogRef.close(this.currentSpending);
        }, 1000,
      );
    } else {
      this.error = 'Please provide all Inputs with valid data';
    }
  }

  initNewSpending(): ISpending {
    return { description: '', amount: 0, date: new Date(), type: ESpendingType.SINGLE, id: 0};
  }

}
