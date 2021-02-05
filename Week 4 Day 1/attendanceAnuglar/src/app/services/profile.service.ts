import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {apiUrl} from './urlConfig';

import { Profile } from '../model/profile';


@Injectable({ providedIn: 'root' })
export class ProfileService {

  private ProfileUrl = apiUrl+'profiles';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET Profile from the server */
  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.ProfileUrl)
      .pipe(
        tap(res =>console.log('fetched Profile')),
        catchError(this.handleError<Profile[]>('getProfile', []))
      );
  }

 /** GET Profile by id. Will 404 if id not found */
  getProfile(id: number): Observable<Profile> {
    const url = `${this.ProfileUrl}/${id}`;
    return this.http.get<Profile>(url).pipe(
      tap(_ =>console.log(`fetched Profile id=${id}`)),
      catchError(this.handleError<Profile>(`getProfile id=${id}`))
    );
  }



  /** POST: add a new Profile to the server */
  addProfile(Profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.ProfileUrl, Profile, this.httpOptions).pipe(
      tap((newProfile: Profile) =>console.log(`added Profile w/ id=${newProfile.id}`)),
      catchError(this.handleError<Profile>('addProfile'))
    );
  }

  /** DELETE: delete the Profile from the server */
  deleteProfile(Profile: Profile | number): Observable<Profile> {
    const id = typeof Profile === 'number' ? Profile : Profile.id;
    const url = `${this.ProfileUrl}/${id}`;

    return this.http.delete<Profile>(url, this.httpOptions).pipe(
      tap(_ =>console.log(`deleted Profile id=${id}`)),
      catchError(this.handleError<Profile>('deleteProfile'))
    );
  }

  /** PUT: update the Profile on the server */
  updateProfile(Profile: Profile): Observable<any> {
    return this.http.put(this.ProfileUrl, Profile, this.httpOptions).pipe(
      tap(_ =>console.log(`updated Profile id=${Profile.id}`)),
      catchError(this.handleError<any>('updateProfile'))
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