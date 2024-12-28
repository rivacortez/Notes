package com.ensolvers.platform.notes.application.internal.queryservices;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategory;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.services.NotesQueryService;
import com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories.NotesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotesQueryServiceImpl implements NotesQueryService {
    private final NotesRepository notesRepository;

    public NotesQueryServiceImpl(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    @Override
    public List<Notes> findAll(Boolean archived) {
        if (archived == null) {
            return notesRepository.findAll();
        }
        return notesRepository.findAllByArchived(archived);
    }

    @Override
    public List<Categories> getCategoriesOfNote(Long noteId) {
        Notes note = notesRepository.findById(noteId).orElseThrow();
        return note.getNoteCategories().stream()
                .map(NoteCategory::getCategory)
                .toList();
    }
}