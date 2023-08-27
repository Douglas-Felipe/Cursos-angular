import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/interfaces';

const body = document.querySelector("body");

@Component({
  selector: 'app-modal-livro',
  templateUrl: './modal-livro.component.html',
  styleUrls: ['./modal-livro.component.css']
})
export class ModalLivroComponent {

  constructor() { }

  @Input() book: Book;
  statusModal: boolean = true;
  @Output() changeModal = new EventEmitter()

  closeModal() {
    this.statusModal = false
    this.changeModal.emit(this.statusModal)
    body.style.overflow = "scroll"
  }

  hiddenScroll(){
    if(this.statusModal == true ) {
      body.style.overflow = "hidden";
    }
  }

  readPreview() {
    window.open(this.book.previewLink, '_blank');
  }

}
