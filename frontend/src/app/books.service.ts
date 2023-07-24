import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IBook {
  id: number;
  title: string;
  pages: number;
  ganres: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseurl: string

  public constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    this.baseurl = isPlatformBrowser(this.platformId) ? 'http://localhost:5001' : 'http://books'
  }

  public getBooks() {
    return this.http.get<IBook[]>(`${this.baseurl}/v1/books`);
  }

  public getBook(id: number) {
    return this.http.get<IBook>(`${this.baseurl}/v1/books/${id}`);
  }
}
