package com.ensolvers.platform.categories.interfaces.rest.transform;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;


public class CategoriesResourceFromEntityAssembler {
    public static CategoriesResource toResourceFromEntity(Categories entity) {
        return new CategoriesResource(entity.getId(), entity.getName(), entity.getColor());
    }
}