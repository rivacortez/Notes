package com.ensolvers.platform.categories.domain.services;
import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.interfaces.rest.resources.CreateCategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.UpdateCategoriesResource;


public interface CategoriesCommandService {
    Categories create(CreateCategoriesResource resource, Long userId);
    Categories update(Long id, UpdateCategoriesResource resource, Long userId);
    void delete(Long id);
}