import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IVotes {
  votes: number;
}

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  private domain:string;

  public constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    this.domain = isPlatformBrowser(this.platformId) ? 'localhost' : 'votes'
  }

  public getVotes(bookId: number) {
    return this.http.get<IVotes>(`http://${this.domain}:8080/v1/books/${bookId}/votes`).pipe(map(v => v.votes), catchError(() => of(0)));
  }

  public upvote(bookId: number) {
    return this.http.post<IVotes>(`http://${this.domain}:8080/v1/books/${bookId}/votes`, {}).pipe(map(v => v.votes));
  }

  public downvote(bookId: number) {
    return this.http.delete<IVotes>(`http://${this.domain}:8080/v1/books/${bookId}/votes`, {}).pipe(map(v => v.votes));
  }
}
