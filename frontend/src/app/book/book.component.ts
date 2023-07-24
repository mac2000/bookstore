import { Component, Input } from '@angular/core';
import { BooksService, IBook } from '../books.service';
import { Observable } from 'rxjs';
import { IReview, ReviewsService } from '../reviews.service';
import { VotesService } from '../votes.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: []
})
export class BookComponent {
  public book$?: Observable<IBook>;
  public reviews$?: Observable<IReview[]>;
  public votes$?: Observable<number>;

  @Input()
  set id(bookId: string) {
    this.book$ = this.booksService.getBook(Number(bookId));
    this.reviews$ = this.reviewsService.getReviews(Number(bookId));
    this.votes$ = this.votesService.getVotes(Number(bookId));
  }

  public constructor(private booksService: BooksService, private reviewsService: ReviewsService, private votesService: VotesService) { }

  public upvote(id: number) {
    this.votes$ = this.votesService.upvote(id)
  }

  public downvote(id: number) {
    this.votes$ = this.votesService.downvote(id)
  }

  public submit(event: Event, bookId: number, input: HTMLInputElement) {
    event.preventDefault();
    this.reviewsService.submitReview(bookId, input.value).subscribe(() => {
      this.reviews$ = this.reviewsService.getReviews(bookId);
    });
    input.value = "";
  }

  public removeReview(bookId: number, id: string) {
    this.reviewsService.removeReview(bookId, id).subscribe(() => {
      this.reviews$ = this.reviewsService.getReviews(bookId);
    });
  }
}
