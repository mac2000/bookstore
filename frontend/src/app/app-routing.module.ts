import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books'
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'books/:id',
    component: BookComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {initialNavigation: 'enabledBlocking'})
  ],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
