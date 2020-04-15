import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISpending} from '../data.module';
import {SpendingService} from '../spending.service';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.css']
})
export class SpendingsComponent implements OnInit {

  @Input() spendings: ISpending[];
  @Output() spendingsChange = new EventEmitter<any>();

  constructor(private spendingService: SpendingService) { }

  ngOnInit(): void {
  }

  deleteSpending(spending: ISpending) {
    this.spendingService.removeSpending(spending).subscribe(() => this.spendingsChange.emit());
  }

  editSpending(spending: ISpending) {
    this.spendingService.updateSpending(spending).subscribe(() => this.spendingsChange.emit());
  }

}
