import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

import { SpendingService } from './spending.service';

describe('SpendingService', () => {
  let service: SpendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ], providers: [
        LoginService,
      ],
    });
    service = TestBed.inject(SpendingService);
  });

  it('should be created ', () => {
    expect(service).toBeTruthy();
  });
});
