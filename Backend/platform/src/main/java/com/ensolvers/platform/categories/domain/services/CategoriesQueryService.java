package com.ensolvers.platform.categories.domain.services;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;

import java.util.List;

public interface CategoriesQueryService {
    List<Categories> findAll();
    List<Categories> findAllByUserId(Long userId);
    List<Notes> getNotesOfCategory(Long categoryId);
}
