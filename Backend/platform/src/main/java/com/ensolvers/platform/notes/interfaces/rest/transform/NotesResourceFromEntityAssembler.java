package com.ensolvers.platform.notes.interfaces.rest.transform;

import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.interfaces.rest.resources.NotesResource;

public class NotesResourceFromEntityAssembler {
    public static NotesResource toResourceFromEntity(Notes entity) {
        return new NotesResource(
                entity.getTitle(),
                entity.getContent(),
                entity.getArchived()
        );
    }
}