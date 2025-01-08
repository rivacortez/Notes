package com.ensolvers.platform.notes.application.internal.commandservices;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategory;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategoryId;
import com.ensolvers.platform.categories.infrastructure.persistence.jpa.repositories.CategoriesRepository;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.model.commands.PatchNotesCommand;
import com.ensolvers.platform.notes.domain.services.NotesCommandService;
import com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories.NotesRepository;
import com.ensolvers.platform.notes.interfaces.rest.resources.UpdateNotesResource;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotesCommandServiceImpl implements NotesCommandService {
    private final NotesRepository notesRepository;
    private final CategoriesRepository categoriesRepository;

    public NotesCommandServiceImpl(NotesRepository notesRepository, CategoriesRepository categoriesRepository) {
        this.notesRepository = notesRepository;
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    public Notes create(NotesCommand resource) {
        Notes note = new Notes();
        note.setTitle(resource.title());
        note.setContent(resource.content());
        note.setArchived(resource.archived() != null ? resource.archived() : false);
        return notesRepository.save(note);
    }

    @Override
    public Notes update(Long id, NotesCommand command) {
        Notes note = notesRepository.findById(id).orElseThrow();
        note.setTitle(command.title());
        note.setContent(command.content());
        note.setArchived(command.archived());
        return notesRepository.save(note);
    }

    @Override
    public Optional<Notes> patch(Long id, PatchNotesCommand resource) {
        Optional<Notes> optionalNote = notesRepository.findById(id);
        if (optionalNote.isEmpty()) {
            return Optional.empty();
        }
        Notes note = optionalNote.get();

        if (resource.archived() != null) {
            note.setArchived(resource.archived());
        }
        return Optional.of(notesRepository.save(note));
    }

    @Override
    public Notes archive(Long id, Boolean archived) {
        Notes note = notesRepository.findById(id).orElseThrow();
        note.setArchived(archived);
        return notesRepository.save(note);
    }

    @Override
    public void delete(Long id) {
        notesRepository.deleteById(id);
    }

    @Override
    public void associateWithCategory(Long noteId, Long categoryId) {
        Notes note = notesRepository.findById(noteId).orElseThrow();
        Categories category = categoriesRepository.findById(categoryId).orElseThrow();
        NoteCategory noteCategory = new NoteCategory(new NoteCategoryId(noteId, categoryId), note, category);
        note.getNoteCategories().add(noteCategory);
        notesRepository.save(note);
    }

    @Override
    public void disassociateFromCategory(Long noteId, Long categoryId) {
        Notes note = notesRepository.findById(noteId).orElseThrow();
        NoteCategory noteCategory = note.getNoteCategories().stream()
                .filter(nc -> nc.getCategory().getId().equals(categoryId))
                .findFirst()
                .orElseThrow();
        note.getNoteCategories().remove(noteCategory);
        notesRepository.save(note);
    }

    @Override
    public void disassociateAllCategories(Long noteId) {
        Notes note = notesRepository.findById(noteId).orElseThrow();
        note.getNoteCategories().clear();
        notesRepository.save(note);
    }
}