
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return parsed response when needParse is true', (done) => {
    const mockResponse = { body: '{"key": "value"}' };

    service.getRequest('/test', true).subscribe(response => {
      expect(response).toEqual({ key: 'value' });
      done();
    });

    const req = httpMock.expectOne('/production/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return raw response when needParse is false', (done) => {
    const mockResponse = { body: '{"key": "value"}' };

    service.getRequest('/test', false).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('/production/test');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors', (done) => {
    const mockError = new ErrorEvent('Network error', {
      message: 'Failed to connect to the server'
    });

    service.getRequest('/test').pipe(
      catchError(err => {
        expect(err).toBeTruthy();
        done();
        return of(null); 
      })
    ).subscribe();

    const req = httpMock.expectOne('/production/test');
    req.error(mockError);
  });
});

