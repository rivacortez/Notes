package com.ensolvers.platform.notes.application.internal.commandservices;

import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.model.commands.PatchNotesCommand;
import com.ensolvers.platform.notes.domain.services.NotesCommandService;
import com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories.NotesRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotesCommandServiceImpl implements NotesCommandService {
    private final NotesRepository notesRepository;

    public NotesCommandServiceImpl(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
    }

    @Override
    public Notes create(NotesCommand command, Long userId) {
        Notes note = new Notes();
        note.setTitle(command.title());
        note.setContent(command.content());
        note.setArchived(command.archived());
        note.setUserId(userId);
        return notesRepository.save(note);
    }



    @Override
    public Notes update(Long id, NotesCommand command, Long userId) {
        Notes note = notesRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Note not found or user not authorized"));
        note.setTitle(command.title());
        note.setContent(command.content());
        note.setArchived(command.archived());
        return notesRepository.save(note);
    }

    @Override
    public Optional<Notes> patch(Long id, PatchNotesCommand command) {
        return Optional.empty();
    }

    @Override
    public Notes archive(Long id, Boolean archived) {
        return null;
    }

    @Override
    public void delete(Long id, Long userId) {
        Notes note = notesRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Note not found or user not authorized"));
        notesRepository.delete(note);
    }

    @Override
    public void associateWithCategory(Long noteId, Long categoryId) {

    }

    @Override
    public void disassociateFromCategory(Long noteId, Long categoryId) {

    }

    @Override
    public void disassociateAllCategories(Long noteId) {

    }

    @Override
    public List<Notes> findAllByUserId(Long userId) {
        return List.of();
    }

    @Override
    public Optional<Notes> getNoteById(Long id) {
        return Optional.empty();
    }


}