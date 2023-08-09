import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChampionPageComponent, ChampionNewPlayerPageComponent } from './champion/champion.component';
import { ChampionDetailsComponent } from './champion-details/champion-details.component';

const routes: Routes = [
  { path: 'champions', component: ChampionPageComponent },
  { path: 'champions_new_player', component: ChampionNewPlayerPageComponent },
  { path: 'champion/:id', component: ChampionDetailsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
