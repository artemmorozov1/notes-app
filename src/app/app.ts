import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddNote } from './features/notes/add-note/add-note';
import { NotesList } from './features/notes/notes-list/notes-list';

@Component({
  selector: 'app-root',
  imports: [AddNote, NotesList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
