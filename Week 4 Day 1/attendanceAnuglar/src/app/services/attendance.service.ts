import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {apiUrl} from './urlConfig';

import { Attendance } from '../model/attendance';


@Injectable({ providedIn: 'root' })
export class Attendanceservice {

  private AttendanceUrl = apiUrl+'Attendances';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET Attendance from the server */
  getAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.AttendanceUrl)
      .pipe(
        tap(res =>console.log('fetched Attendance')),
        catchError(this.handleError<Attendance[]>('getAttendance', []))
      );
  }

 /** GET Attendance by id. Will 404 if id not found */
  getAttendance(id: number): Observable<Attendance> {
    const url = `${this.AttendanceUrl}/${id}`;
    return this.http.get<Attendance>(url).pipe(
      tap(_ =>console.log(`fetched Attendance id=${id}`)),
      catchError(this.handleError<Attendance>(`getAttendance id=${id}`))
    );
  }


  /** POST: add a new Attendance to the server */
  addAttendance(Attendance: Attendance): Observable<Attendance> {
    return this.http.post<Attendance>(this.AttendanceUrl, Attendance, this.httpOptions).pipe(
      tap((newAttendance: Attendance) =>console.log(`added Attendance w/ id=${newAttendance.id}`)),
      catchError(this.handleError<Attendance>('addAttendance'))
    );
  }

  /** DELETE: delete the Attendance from the server */
  deleteAttendance(Attendance: Attendance | number): Observable<Attendance> {
    const id = typeof Attendance === 'number' ? Attendance : Attendance.id;
    const url = `${this.AttendanceUrl}/${id}`;

    return this.http.delete<Attendance>(url, this.httpOptions).pipe(
      tap(_ =>console.log(`deleted Attendance id=${id}`)),
      catchError(this.handleError<Attendance>('deleteAttendance'))
    );
  }

  /** PUT: update the Attendance on the server */
  updateAttendance(Attendance: Attendance): Observable<any> {
    return this.http.put(this.AttendanceUrl, Attendance, this.httpOptions).pipe(
      tap(_ =>console.log(`updated Attendance id=${Attendance.id}`)),
      catchError(this.handleError<any>('updateAttendance'))
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