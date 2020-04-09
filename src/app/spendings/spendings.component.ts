import {Component, Input, OnInit} from '@angular/core';
import {ISpending} from '../data.module';

@Component({
  selector: 'app-spendings',
  templateUrl: './spendings.component.html',
  styleUrls: ['./spendings.component.css']
})
export class SpendingsComponent implements OnInit {

  @Input() spendings: ISpending[];

  constructor() { }

  ngOnInit(): void {
  }

}
