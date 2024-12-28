package com.ensolvers.platform.categories.domain.services;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;

import java.util.List;

public interface CategoriesQueryService {
    List<Categories> findAll();
}
