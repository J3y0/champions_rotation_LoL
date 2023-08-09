import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { switchMap, Observable, catchError, throwError } from 'rxjs';

import { ChampionIds, ChampionInfos, ChampionNames } from '../champion';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ChampionService {
  private httpOptions = {
    "headers": new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Riot-Token': environment.apiKey,
    })
  }

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  getChampionRotation(): Observable<ChampionIds> {
    return this.http.get<ChampionIds>("/api/lol/platform/v3/champion-rotations", this.httpOptions);
  }

  getChampionNames() {
    return this.http.get<ChampionNames[]>(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json`).pipe(
      catchError(this.handleError)
    );
  }

  getChampionById(id: number) {
    return this.http.get<ChampionInfos>(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champions/${id}.json`).pipe(
      catchError(this.handleError)
    );
  }
}
