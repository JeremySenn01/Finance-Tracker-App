import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EOperation, ESpendingType, IDialogProps, ISpending } from '../data.module';
import { SpendingService } from '../Service/spending.service';

@Component({
  selector: 'app-new-spending',
  templateUrl: './new-spending.component.html',
  styleUrls: ['./new-spending.component.css'],
})
export class NewSpendingComponent implements OnInit {
  spending: ISpending;
  dialogTitle: string;
  error: string;
  success: string;
  disableCloseDialog: boolean;
  spendingForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewSpendingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IDialogProps,
              private spendingService: SpendingService) {
  }

  ngOnInit(): void {
    const isNewSpending = !(this.data && this.data.operation === EOperation.UPDATE);
    const spending = isNewSpending ?
      this.initNewSpending() :
      this.data.spending;

    const description = spending.description;
    const amount = spending.amount >= 0 ? spending.amount : -spending.amount;
    const date = spending.date;
    const isIncome = spending.amount > 0;
    this.dialogTitle = isNewSpending ? 'New Spending' : 'Edit Spending';
    this.spending = spending;

    this.spendingForm = new FormGroup({
      description: new FormControl(description, [Validators.required]),
      amount: new FormControl(amount, [Validators.required]),
      date: new FormControl(date, [Validators.required]),
      isIncome: new FormControl(isIncome, [Validators.required]),
    });
  }

  onSave(): void {
    if (this.spendingForm.valid) {
      const controls = this.spendingForm.controls;
      this.spending.description = controls.description.value;
      this.spending.date = controls.date.value;
      this.spending.amount = controls.isIncome.value ? controls.amount.value : -controls.amount.value;
      this.disableCloseDialog = true;
      this.dialogRef.disableClose = true;

      this.saveToBackend();
    } else {
      this.error = 'Please provide all Inputs with valid data';
    }
  }

  saveToBackend() {
    const action = this.data.operation === EOperation.NEW ?
      this.spendingService.addSpending(this.spending) :
      this.spendingService.updateSpending(this.spending);

    action.subscribe(
      (response) => this.handleSuccess(response),
      () => this.handleError(),
    );
  }

  handleError() {
    this.error = `Couldn\'t save changes`;
    this.disableCloseDialog = false;
    this.dialogRef.disableClose = false;
  }

  handleSuccess(response: HttpResponse<ISpending>): void {
    if (response.status === 200) {
      this.success = 'Success';
      this.error = undefined;
      setTimeout(() => {
        this.disableCloseDialog = false;
        this.dialogRef.disableClose = false;
        this.dialogRef.close(this.spending);
      }, 1000);
    } else {
      this.handleError();
    }
  }

  initNewSpending(): ISpending {
    return { description: '', amount: 0, date: new Date(), type: ESpendingType.SINGLE, id: 0};
  }
}
