import { Component, inject } from '@angular/core';
import { NotesService } from '../../../core/services/notes.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.html',
  styleUrl: './add-note.css',
})
export class AddNote {
  form = new FormGroup({
    title: new FormControl<string>(''),
    content: new FormControl<string>('')
  });

  notes = inject(NotesService);

  handleSubmit(){
    const title = this.form.value.title ?? '';
    const content = this.form.value.content ?? '';

    if (!title) return;

    this.notes.add(title, content);
    this.form.reset();
  }
}
