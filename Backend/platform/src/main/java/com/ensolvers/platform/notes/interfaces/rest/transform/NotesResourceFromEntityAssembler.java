package com.ensolvers.platform.notes.interfaces.rest.transform;

import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.interfaces.rest.resources.NotesResource;

import java.util.stream.Collectors;

public class NotesResourceFromEntityAssembler {
    public static NotesResource toResourceFromEntity(Notes entity) {
        return new NotesResource(
                entity.getId(),
                entity.getTitle(),
                entity.getContent(),
                entity.getArchived(),
                entity.getNoteCategories().stream()
                        .map(noteCategory -> noteCategory.getCategory().getId())
                        .toList()
        );
    }
}