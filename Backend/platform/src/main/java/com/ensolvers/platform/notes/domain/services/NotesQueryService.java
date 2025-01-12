package com.ensolvers.platform.notes.domain.services;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;

import java.util.List;

public interface NotesQueryService {
    List<Notes> findAll(Boolean archived);

    List<Categories> getCategoriesOfNote(Long noteId);
    List<Notes> findAllByUserId(Long userId);
}