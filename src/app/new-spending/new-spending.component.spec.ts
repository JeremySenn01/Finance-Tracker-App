import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EOperation, ESpendingType, IDialogProps } from '../data.module';
import { SpendingService } from '../Service/spending.service';

import { NewSpendingComponent } from './new-spending.component';

describe('NewSpendingComponent', () => {
  let component: NewSpendingComponent;
  let fixture: ComponentFixture<NewSpendingComponent>;

  const mockData: IDialogProps = {
    spending: {
      id: 0,
      type: ESpendingType.SINGLE,
      description: 'description',
      date: new Date(),
      amount: 10.2,
    },
    operation: EOperation.NEW,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpendingComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { } },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: SpendingService, useValue: { }}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
