import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EOperation, IDialogProps, ISpending } from '../data.module';
import { NewSpendingComponent } from '../new-spending/new-spending.component';
import { SpendingService } from '../Service/spending.service';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.css'],
})
export class SpendingsComponent implements OnInit {

  @Input() spendings: ISpending[];
  @Output() spendingsChange = new EventEmitter<any>();

  constructor(private spendingService: SpendingService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  deleteSpending(spending: ISpending) {
    this.spendingService.removeSpending(spending).subscribe(() => this.spendingsChange.emit());
  }

  editSpending(spending: ISpending) {
    const spendingProps: IDialogProps = { spending, operation: EOperation.UPDATE};
    const dialogRef = this.dialog.open(NewSpendingComponent, {
      data: spendingProps,
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.spendingService.updateSpending(result).subscribe(() => this.spendingsChange.emit());
    });
  }

}