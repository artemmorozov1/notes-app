import { Injectable, signal } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly notesState = signal<Note[]>([]);
  readonly notes = this.notesState.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  add(title: string, content: string): void {
    const newNote: Note = {
      id: Date.now(),
      title: title,
      content: content,
      createdAt: new Date(),
      isPinned: false
    }

    this.notesState.update(notes => [...notes, newNote]);
    this.saveToLocalStorage();
  }

  changePinStatus(id: number): void {
    this.notesState.update(notes => notes.map(note => {
      if (note.id === id) {
        return { ...note, isPinned: !note.isPinned };
      }
      return note;
    }));
    this.saveToLocalStorage();
  };

  update(id: number, title: string, content: string): void {

    this.notesState.update(notes => notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          title: title,
          content: content
        };
      }
      return note;
    }));

    this.saveToLocalStorage();
  }

  delete(id: number): void {
    this.notesState.update(notes => notes.filter(note => note.id !== id));
    this.saveToLocalStorage();
  }

  saveToLocalStorage(): void {
    localStorage.setItem('notes', JSON.stringify(this.notesState()));
  }

  loadFromLocalStorage(): void {
    const notesData = localStorage.getItem('notes');

    if (!notesData) {
      this.notesState.set([]);
      return;
    }

    try {
      const parsedNotes = JSON.parse(notesData) as Note[];

      const restored = parsedNotes.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt)
      }));

      this.notesState.set(restored);
    }
    catch {
      this.notesState.set([]);
    }
  }
}
