import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as moment from 'moment';
import { of } from 'rxjs';
import { ESpendingType, ETimeUnit, ISpending } from '../data.module';
import { NewSpendingComponent } from '../new-spending/new-spending.component';
import { LoginService } from '../Service/login.service';
import { SpendingService } from '../Service/spending.service';
import { SpendingsComponent } from '../spendings/spendings.component';
import { SummaryComponent } from '../summary/summary.component';
import { SpendingOverviewComponent } from './spending-overview.component';
import createSpyObj = jasmine.createSpyObj;

xdescribe('SpendingOverviewComponent', () => {
  let component: SpendingOverviewComponent;
  let fixture: ComponentFixture<SpendingOverviewComponent>;
  let mockSpendingService: jasmine.SpyObj<SpendingService>;
  let  mockMatDialog: jasmine.SpyObj<MatDialog>;

  const mockSpendings: ISpending[] = [
    {
      id: 1,
      amount: 12.50,
      date: moment('2020-04-21').toDate(),
      description: 'Spending 1',
      type: ESpendingType.SINGLE,
    }, {
      id: 2,
      amount: 12.50,
      date: moment('2020-04-18').toDate(),
      description: 'Spending 2',
      type: ESpendingType.SINGLE,
    }, {
      id: 3,
      amount: 12.50,
      date: moment('2020-05-18').toDate(),
      description: 'Spending 3',
      type: ESpendingType.SINGLE,
    },
  ];

  beforeAll(() => {
    jasmine.clock().mockDate(moment('2020-04-21').toDate());
  });

  beforeEach(async(() => {
    mockSpendingService = createSpyObj('SpendingService', ['getSpendings', 'addSpending']);
    mockMatDialog = createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [
        SpendingOverviewComponent,
        SummaryComponent,
        SpendingsComponent,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: LoginService, useValue: { }},
        { provide: MatDialog, useValue: mockMatDialog},
        { provide: SpendingService, useValue: mockSpendingService},
      ],
    }).compileComponents();
  }));

  describe('date functions and spending filter', () => {
    it('should create and filter spendings', async (done: DoneFn) => {
      await initTest();

      expect(component).toBeTruthy();
      expect(component.timeUnit).toBe(ETimeUnit.MONTH);
      expect(component.spendings.length).toBe(3);
      expect(component.filteredSpendings.length).toBe(2);
      done();
    });

    it('should change timeUnit and filter spendings', async (done: DoneFn) => {
      await initTest();

      const buttonGroup = fixture.debugElement.query(By.css('.buttonGroup'));
      const weekButton = buttonGroup.query(By.css('button:first-child')).nativeElement;
      const monthButton = buttonGroup.query(By.css('button:nth-child(2)')).nativeElement;
      const yearButton = buttonGroup.query(By.css('button:last-child')).nativeElement;
      expect(weekButton).toBeTruthy();
      expect(monthButton).toBeTruthy();
      expect(yearButton).toBeTruthy();

      expect(component.timeUnit).toBe(ETimeUnit.MONTH);
      expect(component.filteredSpendings.length).toBe(2);

      weekButton.click();

      expect(component.timeUnit).toBe(ETimeUnit.WEEK);
      expect(component.filteredSpendings.length).toBe(1);

      yearButton.click();

      expect(component.timeUnit).toBe(ETimeUnit.YEAR);
      expect(component.filteredSpendings.length).toBe(3);
      done();
    });

    it('should go one month further and one back', async (done: DoneFn) => {
      await initTest();

      const { backButton, forwardButton} = getChangeDateButtons();
      compareDate(component.startDate, '2020-04-01');
      compareDate(component.endDate, '2020-04-30');
      expect(component.filteredSpendings.length).toBe(2);

      forwardButton.click();
      compareDate(component.startDate, '2020-05-01');
      compareDate(component.endDate, '2020-05-31');
      expect(component.filteredSpendings.length).toBe(1);

      backButton.click();
      compareDate(component.startDate, '2020-04-01');
      compareDate(component.endDate, '2020-04-30');
      expect(component.filteredSpendings.length).toBe(2);

      component.selectedMonth = 0;
      backButton.click();
      compareDate(component.startDate, '2019-12-01');
      compareDate(component.endDate, '2019-12-31');
      expect(component.filteredSpendings.length).toBe(0);

      forwardButton.click();
      compareDate(component.startDate, '2020-01-01');
      compareDate(component.endDate, '2020-01-31');
      expect(component.filteredSpendings.length).toBe(0);
      done();
    });

    it('should go one year further and one back', async (done: DoneFn) => {
      await initTest();

      component.setTimeUnit(ETimeUnit.YEAR);
      fixture.detectChanges();

      const { backButton, forwardButton} = getChangeDateButtons();
      compareDate(component.startDate, '2020-01-01');
      compareDate(component.endDate, '2020-12-31');
      expect(component.filteredSpendings.length).toBe(3);

      forwardButton.click();
      compareDate(component.startDate, '2021-01-01');
      compareDate(component.endDate, '2021-12-31');
      expect(component.filteredSpendings.length).toBe(0);

      backButton.click();
      compareDate(component.startDate, '2020-01-01');
      compareDate(component.endDate, '2020-12-31');
      expect(component.filteredSpendings.length).toBe(3);
      done();
    });

    it('should go one week further and one back', async (done: DoneFn) => {
      await initTest();

      component.setTimeUnit(ETimeUnit.WEEK);
      fixture.detectChanges();

      const { backButton, forwardButton} = getChangeDateButtons();
      compareDate(component.startDate, '2020-04-20');
      compareDate(component.endDate, '2020-04-26');
      expect(component.filteredSpendings.length).toBe(1);

      forwardButton.click();
      compareDate(component.startDate, '2020-04-27');
      compareDate(component.endDate, '2020-05-03');
      expect(component.filteredSpendings.length).toBe(0);

      backButton.click();
      compareDate(component.startDate, '2020-04-20');
      compareDate(component.endDate, '2020-04-26');
      expect(component.filteredSpendings.length).toBe(1);
      done();
    });

    it('should reset date if timeUnit was changed ', async (done: DoneFn) => {
      await initTest();
      component.startDate = moment('2015-03-01').toDate();
      component.endDate = moment('2015-03-31').toDate();

      const weekButton = fixture.debugElement.query(By.css('.buttonGroup > button:first-child')).nativeElement;
      weekButton.click();

      compareDate(component.startDate, '2020-04-20');
      compareDate(component.endDate, '2020-04-26');
      done();
    });

    function getChangeDateButtons(): { backButton: any, forwardButton: any } {
      const backButton = fixture.debugElement.query(By.css('.spendingNav > button:first-child')).nativeElement;
      const forwardButton = fixture.debugElement.query(By.css('.spendingNav > button:last-child')).nativeElement;

      return { backButton, forwardButton};
    }

    function compareDate(actual: Date, expected) {
      expect(moment(actual).format('YYYY-MM-DD')).toBe(expected);
    }
  });

  describe('handle spendings', () => {
    it('should open the add dialog', async (done: DoneFn) => {
      const mockDialogRef: jasmine.SpyObj<MatDialogRef<NewSpendingComponent>> =
        jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
      mockMatDialog.open.and.returnValue(mockDialogRef);
      mockDialogRef.afterClosed.and.returnValue(of({
        id: 3,
        amount: 12.50,
        date: moment('2020-04-21').toDate(),
        description: 'Spending 4',
        type: ESpendingType.SINGLE,
      }));
      await initTest();

      fixture.debugElement.query(By.css('.new-spending')).nativeElement.click();
      expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
      expect(mockSpendingService.getSpendings).toHaveBeenCalledTimes(2);
      done();
    });
  });

  async function initTest(spendingsToMock: ISpending[] = mockSpendings) {
    mockSpendingService.getSpendings.and.returnValue(of(spendingsToMock));
    fixture = TestBed.createComponent(SpendingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }
});

