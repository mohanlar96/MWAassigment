import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {apiUrl} from './urlConfig';

import { Faculty } from '../model/faculty';


@Injectable({ providedIn: 'root' })
export class FacultyService {

  private FacultyUrl = apiUrl+'faculties';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET Faculty from the server */
  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.FacultyUrl)
      .pipe(
        tap(res =>console.log('fetched Faculty')),
        catchError(this.handleError<Faculty[]>('getFaculty', []))
      );
  }

 /** GET Faculty by id. Will 404 if id not found */
  getFaculty(id: number): Observable<Faculty> {
    const url = `${this.FacultyUrl}/${id}`;
    return this.http.get<Faculty>(url).pipe(
      tap(_ =>console.log(`fetched Faculty id=${id}`)),
      catchError(this.handleError<Faculty>(`getFaculty id=${id}`))
    );
  }

  // of(1, 2, 3, 4).pipe(
  //   tap(el => console.log("Process "+ el),                     //  tap is process of fetching  started .
  //    err => console.error(err),                               //  second  is  error 
  //    () => console.log("Complete")                           //  third is complete  
  //   ),
  //   filter(n => n % 2 === 0)                                //in pipe we can use multiple filter or operator 
  //  ).subscribe(el => console.log("Even number: "+ el)); 




   //////// Save methods //////////

  /** POST: add a new Faculty to the server */
  addFaculty(Faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.FacultyUrl, Faculty, this.httpOptions).pipe(
      tap((newFaculty: Faculty) =>console.log(`added Faculty w/ id=${newFaculty.id}`)),
      catchError(this.handleError<Faculty>('addFaculty'))
    );
  }

  /** DELETE: delete the Faculty from the server */
  deleteFaculty(Faculty: Faculty | number): Observable<Faculty> {
    const id = typeof Faculty === 'number' ? Faculty : Faculty.id;
    const url = `${this.FacultyUrl}/${id}`;

    return this.http.delete<Faculty>(url, this.httpOptions).pipe(
      tap(_ =>console.log(`deleted Faculty id=${id}`)),
      catchError(this.handleError<Faculty>('deleteFaculty'))
    );
  }

  /** PUT: update the Faculty on the server */
  updateFaculty(Faculty: Faculty): Observable<any> {
    return this.http.put(this.FacultyUrl, Faculty, this.httpOptions).pipe(
      tap(_ =>console.log(`updated Faculty id=${Faculty.id}`)),
      catchError(this.handleError<any>('updateFaculty'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transformi ng error for user consumption
     console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
}