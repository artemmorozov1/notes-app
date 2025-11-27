import { Component, inject } from '@angular/core';
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
  notesService = inject(NotesService);
  
  get allNotes(){
    return this.notesService.getAll();
  }

  onDelete(id: number) {
    this.notesService.delete(id);
  }

  onSave(note: { id: number, title: string, content: string }){
    this.notesService.update(note.id, note.title, note.content);
  }

  currentFilter: string = '';

  onFilterChange(filter: string){
    if (filter !== this.currentFilter){
      this.currentFilter = filter;
    }
  }

  get filteredNotes(){
    const filter = this.currentFilter.trim().toLowerCase();

    if (filter === '') {
      return this.allNotes;
    }

    const filtered = this.allNotes.filter(note => {
      const title = note.title.toLowerCase();
      const content = note.content.toLowerCase();

      return title.includes(filter) || content.includes(filter);
    });
    
    return filtered;
  }

  currentSort: string = 'date';

  onSortChange(sortBy: string){
    this.currentSort = sortBy;
  }

  get sortedNotes(){
    const filtered = this.filteredNotes;
    const pinnedNotes = filtered.filter(note => note.isPinned);
    const unpinnedNotes = filtered.filter(note => !note.isPinned);


    const sortNotes = (notes: Note[]) => {
      const sorted = [...notes];

      if (this.currentSort === 'date'){
        sorted.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
      } else if (this.currentSort === 'title'){
        sorted.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }

      return sorted;
    }

    return [...sortNotes(pinnedNotes), ...sortNotes(unpinnedNotes)];
  }

  onPinChange(id: number){
    this.notesService.changePinStatus(id);
  }
}
