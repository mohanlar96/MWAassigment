import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Game} from './game-list/game-list.component';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  constructor(private http:HttpClient) {} 

  // 1 Build URL . 

  private apiBasedUrl="http://localhost:3000/api";

  //2 


  private handleErrors(error:any):Promise<any>{
    console.log("something went wrong", error);
    return Promise.reject(error.message || error);
  }

  public getGames():Promise<Game[]>{

    const url:string=this.apiBasedUrl+"/games";

    return this.http.get(url).toPromise().then(res=>res as Game[] ).catch(this.handleErrors);
  }


}
