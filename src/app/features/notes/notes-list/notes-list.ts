import { Component, inject, signal, computed } from '@angular/core';
import { NotesService } from '../../../core/services/notes.service';
import { NoteItem } from '../note-item/note-item';
import { NotesFilters } from '../notes-filters/notes-filters';
import { Note } from '../../../core/interfaces/note.interface';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteItem, NotesFilters],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.css',
})
export class NotesList {
  private readonly notesService = inject(NotesService);
  
  get allNotes(){
    return this.notesService.notes();
  }

  readonly filter = signal<string>('');
  readonly sortBy = signal<string>('date');

  onSortChange(sortBy: string){
    this.sortBy.set(sortBy);
  }

  onFilterChange(filter: string){
    this.filter.set(filter);
  }

  onPinChange(id: number){
    this.notesService.changePinStatus(id);
  }

  onDelete(id: number) {
    this.notesService.delete(id);
  }

  onSave(note: { id: number, title: string, content: string }){
    this.notesService.update(note.id, note.title, note.content);
  }

  readonly filteredNotes = computed<Note[]>(() => {
    const filter = this.filter().trim().toLowerCase();
    const notes = this.allNotes;

    if (!filter) {
      return notes;
    }

    const filtered = notes.filter(note => {
      const title = note.title.toLowerCase();
      const content = note.content.toLowerCase();

      return title.includes(filter) || content.includes(filter);
    });
    
    return filtered;
  });

  readonly sortedNotes = computed<Note[]>(() => {
    const filtered = this.filteredNotes();
    const sortMode = this.sortBy();

    const pinnedNotes = filtered.filter(note => note.isPinned);
    const unpinnedNotes = filtered.filter(note => !note.isPinned);

    const sortNotes = (notes: Note[]) : Note[] => {
      const sorted = [...notes];

      if (sortMode === 'date') {
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      } else if (sortMode === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      }

      return sorted;
    }

    return [...sortNotes(pinnedNotes), ...sortNotes(unpinnedNotes)];
  });
}
