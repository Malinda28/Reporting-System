import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class MiddlewareService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((response) => {
        // Modify the response here
        console.log(response);
        
        return {body:{hell:'hi'}} as HttpEvent<any>;
      })
    );
  }
}
