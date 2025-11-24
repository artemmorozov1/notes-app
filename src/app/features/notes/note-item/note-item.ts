import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../../core/interfaces/note.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './note-item.html',
  styleUrl: './note-item.css',
})
export class NoteItem {
  @Input() note!: Note;
  @Output() deleteNote = new EventEmitter<number>();

  handleDelete(){
    this.deleteNote.emit(this.note.id)
  }
}
