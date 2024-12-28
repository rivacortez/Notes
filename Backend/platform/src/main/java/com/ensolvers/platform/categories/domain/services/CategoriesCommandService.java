package com.ensolvers.platform.categories.domain.services;
import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;


public interface CategoriesCommandService {
    Categories create(CategoriesResource resource);
    Categories update(Long id, CategoriesResource resource);
    void delete(Long id);
}