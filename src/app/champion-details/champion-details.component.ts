import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ChampionInfos } from '../champion';
import { ChampionService } from '../service/champion.service';

@Component({
  selector: 'app-champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.scss']
})
export class ChampionDetailsComponent {
  championInfo$?: Observable<ChampionInfos>;

  constructor(private championService: ChampionService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.championInfo$ = this.championService.getChampionById(Number(this.route.snapshot.paramMap.get("id")))
  }
}
