import { Component, OnInit } from '@angular/core';
import { BooksService, IBook } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: []
})
export class BooksComponent implements OnInit {
  public books: IBook[] = [];

  public constructor(private booksService: BooksService) {}

  public ngOnInit(): void {
    this.load()
  }

  public load() {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
    })
  }
}
