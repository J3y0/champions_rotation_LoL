import { Component, Input } from '@angular/core';

import { ChampionNames } from '../champion';
import { ChampionService } from '../service/champion.service';
import { map, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-champion',
  templateUrl: './champion.component.html',
  styleUrls: ['./champion.component.scss']
})
export class ChampionComponent {
  @Input() newPlayer: boolean = false;

  allChampionInfos: ChampionNames[] = []; 

  curChampionInfos$?: Observable<ChampionNames[]>;
  // error?: HttpErrorResponse;

  constructor(private championService: ChampionService) {}

  ngOnInit(): void {
    this.getAllChampionInfos();

    this.curChampionInfos$ = this.championService.getChampionRotation().pipe(
      map(curIds => this.newPlayer ? curIds.freeChampionIdsForNewPlayers : curIds.freeChampionIds),
      map(currId => this.retrieveInfos(currId)),
      // tap({
      //   error: (err) => {
      //     this.error = err; 
      //   }
      // })
    );
  }

  getAllChampionInfos(): void {
    this.championService.getChampionNames()
      .subscribe(
        i => {this.allChampionInfos = i}
      );
  }

  retrieveInfos(champIds: number[]): ChampionNames[] {
    let freeChampInfos: ChampionNames[] = [];
    this.allChampionInfos.forEach(
      champ => {
        if (champIds.includes(champ.id)) {
          freeChampInfos.push(champ)
        }
      }
    );
    return freeChampInfos;
  }
}

@Component({
  selector: 'app-champion-page',
  template: `
  <div class="title">
    <div class="style-bar"></div>
    <h2>Free Champions of the week</h2>
  </div>
  <app-champion [newPlayer]="false" class="content"></app-champion>`,
  styleUrls: ['./champion-page.component.scss'],
})
export class ChampionPageComponent { }

@Component({
  selector: 'app-champion-new-player-page',
  template: `
  <div class="title">
    <div class="style-bar"></div>
    <h2>Free Champions of the week for new players</h2>
  </div>
  <app-champion [newPlayer]="true" class="content"></app-champion>`,
  styleUrls: ['./champion-page.component.scss'],
})
export class ChampionNewPlayerPageComponent { }