package com.ensolvers.platform.notes.interfaces.rest.transform;

import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.interfaces.rest.resources.NotesResource;

public class CreateNotesCommandFromResourceAssembler {
    public static NotesCommand toCommandFromResource(NotesResource resource) {
        return new NotesCommand(resource.title(), resource.content(), resource.archived(),resource.idCategories());
    }
}