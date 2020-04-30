import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SPENDINGS } from '../mock-spendings';
import { LoginService } from './login.service';
import { SpendingService } from './spending.service';
import createSpyObj = jasmine.createSpyObj;

fdescribe('SpendingService', () => {
  let service: SpendingService;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let httpMock: HttpTestingController;
  const mockSpendings = SPENDINGS;

  beforeEach(() => {
    mockLoginService = createSpyObj('LoginService', ['authenticate', 'getToken']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService},
      ],
    });
    service = TestBed.inject(SpendingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created ', () => {
    expect(service).toBeTruthy();
  });

  it('should get spendings successfully', (done) => {
    const mockToken = 'some token';
    mockLoginService.getToken.and.returnValue(mockToken);

    service.getSpendings().subscribe((result) => {
      expect(result).toBe(mockSpendings);
      done();
    });

    httpMock.expectOne(req => {
      return req.url === 'http://localhost:8080/spendings'
        && req.headers.get('Authorization') === mockToken
        && req.headers.get('Content-Type') === 'application/json'
        && req.method === 'GET';
    }).flush(mockSpendings);
  });

  it('should add spending successfully', (done) => {
    const mockToken = 'some token';
    const mockSpending = mockSpendings[0];
    mockLoginService.getToken.and.returnValue(mockToken);

    service.addSpending(mockSpending).subscribe((result) => {
      expect(result.body).toBe(mockSpending);
      expect(result.status).toBe(200);
      done();
    });

    httpMock.expectOne(req => {
      return req.url === 'http://localhost:8080/spendings'
        && req.headers.get('Authorization') === mockToken
        && req.headers.get('Content-Type') === 'application/json'
        && JSON.stringify(req.body) === JSON.stringify(mockSpending)
        && req.method === 'POST';
    }).flush(mockSpending);
  });

  it('should delete spending successfully', ((done) => {
    const token = 'janIschSehrPingelig';
    const mockSpending = mockSpendings[0];
    mockLoginService.getToken.and.returnValue(token);

    service.removeSpending(mockSpending).subscribe((response) => {
      expect(response.ok).toBe(true);
      done();
    });

    httpMock.expectOne(req => {
      return req.url === `http://localhost:8080/spendings/${mockSpending.id}`
        && req.method === 'DELETE'
        && req.headers.get('Authorization') === token
        && req.headers.get('Content-Type') === 'application/json';
    }).flush(new HttpResponse());
  }));

});
