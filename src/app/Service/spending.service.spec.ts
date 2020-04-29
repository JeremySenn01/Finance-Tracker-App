import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

import { SpendingService } from './spending.service';
import createSpyObj = jasmine.createSpyObj;

describe('SpendingService', () => {
  let service: SpendingService;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    mockLoginService = createSpyObj('LoginService', ['authenticate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService},
      ],
    });
    service = TestBed.inject(SpendingService);
  });

  it('should be created ', () => {
    expect(service).toBeTruthy();
  });
});
