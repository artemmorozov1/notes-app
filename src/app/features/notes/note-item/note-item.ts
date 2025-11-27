import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Note } from '../../../core/interfaces/note.interface';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './note-item.html',
  styleUrl: './note-item.css',
})
export class NoteItem {
  @Input() note!: Note;

  // Delete logic
  @Output() deleteNote = new EventEmitter<number>();

  handleDelete(){
    this.deleteNote.emit(this.note.id)
  }

  // Editing logic
  isEditing: boolean = false;
  
  form = new FormGroup({
    title: new FormControl<string>(''),
    content: new FormControl<string>('')
  });

  handleEdit(){
    this.isEditing = true;

    this.form.patchValue({
      title: this.note.title,
      content: this.note.content
    });
  }

  handleCancel(){
    this.isEditing = false;
  }

  @Output() saveNote = new EventEmitter<{id: number, title: string, content: string}>();

  get canSave(): boolean {
    return !!this.form.value.title && this.form.value.title.trim().length > 0;
  }

  handleSave(){
    if (!this.canSave) return;

    this.saveNote.emit({
      id: this.note.id,
      title: this.form.value.title ?? '',
      content: this.form.value.content ?? ''
    });
    this.isEditing = false;
  }

  //Pinning logic
  @Output() pinNote = new EventEmitter<number>();
  handlePin(){
    this.pinNote.emit(this.note.id);
  }
}
