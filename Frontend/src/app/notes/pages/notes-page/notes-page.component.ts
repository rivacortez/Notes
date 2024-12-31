import { Component } from '@angular/core';
import {SearchBarComponent} from '../../components/search-bar/search-bar.component';
import {NotesListComponent} from '../../components/notes-list/notes-list.component';
import {FloatingActionButtonComponent} from '../../components/floating-action-button/floating-action-button.component';

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
export class NotesPageComponent {

}
