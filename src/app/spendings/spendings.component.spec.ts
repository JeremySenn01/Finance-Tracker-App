import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { SpendingService } from '../Service/spending.service';
import { SpendingsComponent } from './spendings.component';

describe('SpendingsComponent', () => {
  let component: SpendingsComponent;
  let fixture: ComponentFixture<SpendingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      declarations: [
        SpendingsComponent,
      ],
      providers: [
        { provide: SpendingService, useValue: { }},
        { provide: MatDialog, useValue: { }},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
