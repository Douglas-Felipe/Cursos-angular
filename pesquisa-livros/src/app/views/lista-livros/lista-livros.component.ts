import { switchMap, map, tap, filter, debounceTime, throwError, catchError, EMPTY, of } from 'rxjs';
import { Component } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Item, BooksResult } from 'src/app/models/interfaces';
import { BookVolumeInfo } from 'src/app/models/bookVolumeInfo';
import { FormControl } from '@angular/forms';

const BREAK = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  searchField = new FormControl();
  errorMensage = '';
  resultBooks: BooksResult;

  constructor(private service: BookService) { }

  foundBooks$ = this.searchField.valueChanges
    .pipe(
      debounceTime(BREAK),
      filter((fieldValue) => fieldValue.length >= 3),
      switchMap((fieldValue) => this.service.search(fieldValue)),
      map(result => this.resultBooks = result),
      map(result => result.items ?? []),
      map(items => this.booksResultsToBooks(items)),
      catchError((erro) => {
        console.error(erro)
        return throwError(() => new Error(this.errorMensage ='Ops, ocorreu um erro. Recarregue a aplicação!'))
      })
    );

  booksResultsToBooks(items: Item[]): BookVolumeInfo[] {
    return items.map(item => new BookVolumeInfo(item));
  }

}


