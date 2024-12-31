import {Component, OnInit} from '@angular/core';
import {NotesEntity} from '../../model/notes.entity';
import {NotesService} from '../../services/notes.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-notes-list',
  imports: [
    NgForOf
  ],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})
export class NotesListComponent implements OnInit {
  notes: NotesEntity[] = [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notesService.getAll().subscribe({
      next: (notes: NotesEntity[]) => {
        this.notes = notes;
      },
      error: (error: any) => {
        console.error('Error loading notes', error);
      }
    });
  }
}
