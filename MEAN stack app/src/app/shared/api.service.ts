import { Injectable } from '@angular/core';
import { Owner } from './owner';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add owner.
  AddOwner(data: Owner): Observable<any> {
    let API_URL = `${this.endpoint}/add-owner`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all owners.
  GetOwners() {
    return this.http.get(`${this.endpoint}`);
  }

  // Get owner.
  GetOwner(id): Observable<any> {
    let API_URL = `${this.endpoint}/read-owner/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update owner.
  UpdateOwner(id, data): Observable<any> {
    let API_URL = `${this.endpoint}/update-owner/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete owner.
  DeleteOwner(id): Observable<any> {
    var API_URL = `${this.endpoint}/delete-owner/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling.
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error.
      errorMessage = error.error.message;
    } else {
      // Get server-side error.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}