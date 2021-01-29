import { Component, OnInit } from '@angular/core';

import {GameDataService} from '../game-data-service.service';

export class Game{
  _id:String;
  title:string;
  year:number;
  price:number;
  designer:string|string[];
}


@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  constructor(private gameData:GameDataService) { }
  public games:Game[];

  title="MOhan lar";

  private getGames():void{

    this.gameData.getGames().then(foundGames=>this.games=foundGames);

  }
  ngOnInit(): void {
    this.getGames();
  }

}
