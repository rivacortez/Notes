package com.ensolvers.platform.notes.domain.services;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.model.commands.PatchNotesCommand;
import com.ensolvers.platform.notes.interfaces.rest.resources.UpdateNotesResource;

import java.util.Optional;

public interface NotesCommandService {
    Notes create(NotesCommand command);
    Notes update(Long id, NotesCommand command);
    Optional<Notes> patch(Long id, PatchNotesCommand command);
    Notes archive(Long id, Boolean archived);
    void delete(Long id);
    void associateWithCategory(Long noteId, Long categoryId);
    void disassociateFromCategory(Long noteId, Long categoryId);

    void disassociateAllCategories(Long noteId);
}