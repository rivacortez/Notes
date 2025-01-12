import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchBarComponent} from '../../components/search-bar/search-bar.component';
import {NotesListComponent} from '../../components/notes-list/notes-list.component';
import {FloatingActionButtonComponent} from '../../components/floating-action-button/floating-action-button.component';
import {NotesEntity} from '../../model/notes.entity';
import {CategoriesEntity} from '../../model/categories.entity';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {Route, Router} from '@angular/router';

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
export class NotesPageComponent  implements OnInit{
  @ViewChild(NotesListComponent) notesListComponent!: NotesListComponent;
  @ViewChild(SearchBarComponent) searchBarComponent!: SearchBarComponent;
  username: string = '';

  constructor(private authenticationService: AuthenticationService,private router:Router) {}

  ngOnInit(): void {
    this.authenticationService.currentUsername.subscribe(username => {
      this.username = username;
    });
  }


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
  onLogout(): void {
    this.authenticationService.signOut();
    this.router.navigate(['/sign-in']);
  }
}
