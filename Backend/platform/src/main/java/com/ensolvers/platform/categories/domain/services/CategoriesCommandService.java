package com.ensolvers.platform.categories.domain.services;
import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.CreateCategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.UpdateCategoriesResource;


public interface CategoriesCommandService {
    Categories create(CreateCategoriesResource resource);
    Categories update(Long id, UpdateCategoriesResource resource);
    void delete(Long id);
}