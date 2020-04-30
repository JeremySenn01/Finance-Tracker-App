import { Location } from '@angular/common';
import { HttpClientModule, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { routes } from '../app-routing.module';
import { LoginService } from './login.service';
import createSpyObj = jasmine.createSpyObj;

describe('LoginService', () => {
  let service: LoginService;
  let mockJwtHelperService: jasmine.SpyObj<JwtHelperService>;
  let httpMock: HttpTestingController;
  let location: Location;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockJwtHelperService = createSpyObj('JwtHelperService', ['isTokenExpired']);
    router = createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: JwtHelperService, useValue: mockJwtHelperService},
        { provide: Router, useValue: router},
      ],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);
    // router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register user successfully', (done: DoneFn) => {
    service.authenticate('jeremy.senn@gmail.com', '123456', true)
      .then(((value) => {
        expect(value).toBe('iAmAToken');
        done();
      }));

    httpMock.expectOne((request: HttpRequest<any>) => {
      return request.method === 'PUT'
        && request.url === 'http://localhost:8080/login'
        && JSON.stringify(request.body) === JSON.stringify({ email: 'jeremy.senn@gmail.com', password: '123456'})
        && request.headers.get('Content-Type') === 'application/json';
    }).flush({ value: 'iAmAToken'});
  });

  it('should login user successfully', (done: DoneFn) => {
    service.authenticate('jeremy.senn@gmail.com', '123456', false)
      .then(((value) => {
        expect(value).toBe('iAmAToken');
        done();
      }));

    httpMock.expectOne((request: HttpRequest<any>) => {
      return request.method === 'POST'
        && request.url === 'http://localhost:8080/login'
        && JSON.stringify(request.body) === JSON.stringify({ email: 'jeremy.senn@gmail.com', password: '123456'})
        && request.headers.get('Content-Type') === 'application/json';
    }).flush({ value: 'iAmAToken'});
  });

  it('should reject the promise when there is an error', (done: DoneFn) => {
    const error = new ErrorEvent('some error');
    service.authenticate('test.test@gmail.com', 'pw', false)
      .then(() => {
        fail('promise was resolved');
        done();
      })
      .catch((err) => {
        expect(err.error).toBe(error);
        done();
      });
    httpMock.expectOne('http://localhost:8080/login').error(error);
  });

  it('should logout successfully', () => {
    const mockToken = 'someToken';
    spyOn(service, 'getToken').and.callFake(() => mockToken);
    spyOn(service, 'clearToken').and.callThrough();
    router.navigate.and.resolveTo();

    service.logout();

    httpMock.expectOne((req) => {
      return req.url === 'http://localhost:8080/login'
        && req.headers.get('Authorization') === mockToken
        && req.method === 'DELETE';
    });

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(service.clearToken).toHaveBeenCalled();

  });
});
