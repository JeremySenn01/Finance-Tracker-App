import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EEntryType, EOperation, ESpendingType, IDialogProps, ISpending } from '../data.module';
import { SpendingService } from '../Service/spending.service';

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
  disableCloseDialog: boolean;
  entryType: EEntryType;
  EntryTypeEnum = EEntryType;

  constructor(public dialogRef: MatDialogRef<NewSpendingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IDialogProps,
              private spendingService: SpendingService,
  ) {
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
    this.entryType = EEntryType.SPENDING;
  }

  onEntryTypeChange(type: EEntryType): void {
    this.entryType = type;
  }

  onSave(): void {
    // Valid Result
    if (this.selectedDate && this.amount && this.description) {
      this.currentSpending.date = this.selectedDate.value;
      this.currentSpending.amount = this.amount;
      this.currentSpending.description = this.description;
      this.disableCloseDialog = true;
      this.dialogRef.disableClose = true;

      // Attempt to save Spending
      this.saveToBackend();
    } else {
      this.error = 'Please provide all Inputs with valid data';
    }
  }

  saveToBackend() {
    if (this.data.operation === EOperation.NEW) {
      this.spendingService.addSpending(this.currentSpending).subscribe((response) => {
        this.handleResponse(response);
      });
    } else {
      this.spendingService.updateSpending(this.currentSpending).subscribe((response) => {
        this.handleResponse(response);
      });
    }
  }

  handleResponse(response: HttpResponse<ISpending>): void {
    if (response.status === 200) {
      this.success = 'success';
      this.error = '';
      setTimeout(() => {
        this.disableCloseDialog = false;
        this.dialogRef.disableClose = false;
        this.dialogRef.close(this.currentSpending);
      }, 1000);
    } else {
      this.error = 'Couldn\'t save changes';
      this.disableCloseDialog = false;
      this.dialogRef.disableClose = false;
    }
  }

  initNewSpending(): ISpending {
    return { description: '', amount: 0, date: new Date(), type: ESpendingType.SINGLE, id: 0};
  }

}
