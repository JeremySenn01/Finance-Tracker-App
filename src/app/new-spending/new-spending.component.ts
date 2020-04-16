import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EOperation, ESpendingType, IDialogProps, ISpending } from '../data.module';

@Component({
  selector: 'app-new-spending',
  templateUrl: './new-spending.component.html',
  styleUrls: ['./new-spending.component.css'],
})
export class NewSpendingComponent implements OnInit {

  currentSpending: ISpending;
  selectedDate: FormControl;
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
        this.dialogTitle = 'New Spending';
        this.currentSpending = this.initNewSpending();
        this.selectedDate = new FormControl(new Date());
      } else {
        this.dialogTitle = 'Edit Spending';
        this.currentSpending = this.data.spending;
        this.selectedDate = new FormControl(this.currentSpending.date);
        this.amount = this.currentSpending.amount;
        this.description = this.currentSpending.description;
      }
    }
  }

  onSave(): void {
    // Valid Result
    if (this.selectedDate && this.amount && this.description) {
      this.currentSpending.date = this.selectedDate.value;
      this.currentSpending.amount = this.amount;
      this.currentSpending.description = this.description;
      this.success = 'success';
      this.error = '';
      console.log('new / updated', this.currentSpending);
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
