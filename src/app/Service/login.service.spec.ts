import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginService } from './login.service';
import createSpyObj = jasmine.createSpyObj;

describe('LoginService', () => {
  let service: LoginService;
  let mockJwtHelperService: jasmine.SpyObj<JwtHelperService>;

  beforeEach(() => {
    mockJwtHelperService = createSpyObj('JwtHelperService', ['isTokenExpired']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: JwtHelperService, useValue: mockJwtHelperService},
      ],
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
