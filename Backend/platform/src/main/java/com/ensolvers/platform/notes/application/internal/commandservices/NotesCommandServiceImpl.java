package com.ensolvers.platform.notes.application.internal.commandservices;

import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.model.commands.PatchNotesCommand;
import com.ensolvers.platform.notes.domain.services.NotesCommandService;
import com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories.NotesRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NotesCommandServiceImpl implements NotesCommandService {
    private final NotesRepository notesRepository;

    public NotesCommandServiceImpl(NotesRepository notesRepository) {
        this.notesRepository = notesRepository;
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
    public Notes update(Long id, NotesCommand resource) {
        Notes note = notesRepository.findById(id).orElseThrow();
        note.setTitle(resource.title());
        note.setContent(resource.content());
        note.setArchived(resource.archived());
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
}