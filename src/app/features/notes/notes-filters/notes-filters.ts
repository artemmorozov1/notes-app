import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-notes-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './notes-filters.html',
  styleUrl: './notes-filters.css',
})
export class NotesFilters {
  @Output() filterChange = new EventEmitter<string>();

  filterControl = new FormControl<string>('');

  @Output() sortChange = new EventEmitter<string>();

  sortControl = new FormControl<string>('date');

  constructor() {
    this.filterControl.valueChanges.subscribe(value => {
      this.filterChange.emit(value ?? '');
    });
    this.sortControl.valueChanges.subscribe(value => {
      this.sortChange.emit(value ?? 'date');
    });
  }
}
