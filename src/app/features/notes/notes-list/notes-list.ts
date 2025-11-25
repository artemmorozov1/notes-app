import { Component, inject } from '@angular/core';
import { NotesService } from '../../../core/services/notes.service';
import { NoteItem } from '../note-item/note-item';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [NoteItem],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.css',
})
export class NotesList {
  notesService = inject(NotesService);
  
  get notes(){
    return this.notesService.getAll();
  }

  onDelete(id: number) {
    this.notesService.delete(id);
  }

  onSave(note: { id: number, title: string, content: string }){
    this.notesService.update(note.id, note.title, note.content);
  }
}
