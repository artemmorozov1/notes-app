import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = [];

  getAll(): Note[] {
    return this.notes;
  }

  add(title: string, content: string): void {
    const newNote: Note = {
      id: Date.now(),
      title: title,
      content: content,
      createdAt: new Date()
    }

    this.notes.push(newNote);
    console.log(this.notes);
  }

  delete(id: number): void {
    const newNotes = this.notes.filter(note => note.id !== id);
    this.notes = newNotes;
  }
}
