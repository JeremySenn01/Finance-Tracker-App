import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingOverviewComponent } from './spending-overview.component';

describe('SpendingOverviewComponent', () => {
  let component: SpendingOverviewComponent;
  let fixture: ComponentFixture<SpendingOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpendingOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
