import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IReview {
  _id: string;
  book: number;
  review: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private domain: string;
  public constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    this.domain = isPlatformBrowser(this.platformId) ? 'localhost' : 'reviews'
  }

  public getReviews(bookId: number) {
    return this.http.get<IReview[]>(`http://${this.domain}:3000/v1/books/${bookId}/reviews`);
  }

  public submitReview(bookId: number, review: string) {
    return this.http.post<IReview>(`http://${this.domain}:3000/v1/books/${bookId}/reviews`, {review});
  }

  public removeReview(bookId: number, id: string) {
    return this.http.delete<void>(`http://${this.domain}:3000/v1/books/${bookId}/reviews/${id}`, {});
  }
}
