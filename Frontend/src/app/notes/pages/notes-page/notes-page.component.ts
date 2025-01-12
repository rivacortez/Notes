import {Component, ViewChild} from '@angular/core';
import {SearchBarComponent} from '../../components/search-bar/search-bar.component';
import {NotesListComponent} from '../../components/notes-list/notes-list.component';
import {FloatingActionButtonComponent} from '../../components/floating-action-button/floating-action-button.component';
import {NotesEntity} from '../../model/notes.entity';
import {CategoriesEntity} from '../../model/categories.entity';

@Component({
  selector: 'app-notes-page',
  imports: [
    SearchBarComponent,
    NotesListComponent,
    FloatingActionButtonComponent
  ],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.css'
})
export class NotesPageComponent  {
  @ViewChild(NotesListComponent) notesListComponent!: NotesListComponent;
  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;

  ngAfterViewInit(): void {
    this.notesListComponent.notesUpdated.subscribe(() => {
      this.searchBarComponent.filterNotes();

    });
    this.searchBarComponent.categoryAddedEvent.subscribe((newCategory: CategoriesEntity) => {
      this.notesListComponent.onCategoryAdded(newCategory);
    });
  }

  onNoteAdded(note: NotesEntity): void {
    this.notesListComponent.notes.push(note);
    this.notesListComponent.loadCategories();
    this.notesListComponent.loadNotes();
  }

  onNotesFiltered(filteredNotes: NotesEntity[]): void {
    this.notesListComponent.notes = filteredNotes;
  }
}
