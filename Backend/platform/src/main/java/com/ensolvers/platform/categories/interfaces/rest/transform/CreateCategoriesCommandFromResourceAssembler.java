package com.ensolvers.platform.categories.interfaces.rest.transform;

import com.ensolvers.platform.categories.domain.model.commands.CategoriesCommand;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;

public class CreateCategoriesCommandFromResourceAssembler {
    public static CategoriesCommand toCommandFromResource(CategoriesResource resource) {
        return new CategoriesCommand(resource.name(), resource.color());
    }
}