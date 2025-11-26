import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFilters } from './notes-filters';

describe('NotesFilters', () => {
  let component: NotesFilters;
  let fixture: ComponentFixture<NotesFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
