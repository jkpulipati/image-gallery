import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

import { InterceptorInterceptor } from './interceptor.interceptor';
import { API_CONFIG, API_CONFIG_TOKEN } from './shared/config/api.config';
import { SharedService } from './shared/services/shared.service';

describe('InterceptorInterceptor', () => {
  let service: SharedService;
  let httpMock: HttpTestingController;
  let interceptor: InterceptorInterceptor;
  let httpRequestSpy;
  let httpHandlerSpy;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorInterceptor
      ]
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SharedService,
        {provide: API_CONFIG_TOKEN, useValue: API_CONFIG},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorInterceptor,
          multi: true,
        }
      ]
    });

    service = TestBed.inject(SharedService);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(InterceptorInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return the catcherror returned from api', () => {
    httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
    httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(
        {error:
            {message: 'test-error'}
        }
    ));
    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
        .subscribe(
            result => console.log('good', result),
            err => {
                console.log('error', err);
                expect(err.error.message).toEqual('test-error');
            }
        );
  });
});
