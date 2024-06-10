import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse } from '../shared/models/base-response.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private readonly env = '/production';
  constructor(private httpClient: HttpClient) { }

  getRequest(url: string, needParse?: boolean): Observable<any> {
    return this.httpClient.get<any>(this.env + url).pipe(
      map(response => {
        if (needParse) {
          return JSON.parse(response.body);
        }
        return response;
      }),
      catchError(err => { throw err }));
  }

}
