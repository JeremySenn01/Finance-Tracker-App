import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { SpendingService } from '../Service/spending.service';

import { SpendingOverviewComponent } from './spending-overview.component';

describe('SpendingOverviewComponent', () => {
  let component: SpendingOverviewComponent;
  let fixture: ComponentFixture<SpendingOverviewComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ SpendingOverviewComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: MatDialog, useValue: { }},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create',
    inject([SpendingService], (spendingService) => {
    spyOn(spendingService, 'getSpendings').and
      .returnValue(new Observable());
    expect(component).toBeTruthy();
  }));
});
