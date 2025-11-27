import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Note[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

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

    this.saveToLocalStorage();
  }

  update(id: number, title: string, content: string): void {
    const noteIndex = this.notes.findIndex(note => note.id === id);

    if (noteIndex === -1) return;

    const note: Note = this.notes[noteIndex];
    const editedNote: Note = {
      ...note,
      title: title,
      content: content
    }

    this.notes[noteIndex] = editedNote;

    this.saveToLocalStorage();
  }

  delete(id: number): void {
    const newNotes = this.notes.filter(note => note.id !== id);
    this.notes = newNotes;

    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadFromLocalStorage(): void {
    const notesData = localStorage.getItem('notes');
    if (notesData) {
      const parsedNotes = JSON.parse(notesData);
      this.notes = parsedNotes.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt)
      }));
    } else {
      this.notes = [];
    }
  }
}
