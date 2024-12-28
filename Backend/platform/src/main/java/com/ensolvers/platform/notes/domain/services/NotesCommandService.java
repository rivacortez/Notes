package com.ensolvers.platform.notes.domain.services;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.model.commands.PatchNotesCommand;

import java.util.Optional;

public interface NotesCommandService {
    Notes create(NotesCommand resource);
    Notes update(Long id, NotesCommand resource);
    Optional<Notes> patch(Long id, PatchNotesCommand resource);
    Notes archive(Long id, Boolean archived);
    void delete(Long id);
}