package com.ensolvers.platform.categories.application.internal.commandservices;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.domain.services.CategoriesCommandService;
import com.ensolvers.platform.categories.infrastructure.persistence.jpa.repositories.CategoriesRepository;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.CreateCategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.UpdateCategoriesResource;
import org.springframework.stereotype.Service;

@Service
public class CategoriesCommandServiceImpl implements CategoriesCommandService {
    private final CategoriesRepository categoriesRepository;

    public CategoriesCommandServiceImpl(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    public Categories create(CreateCategoriesResource resource, Long userId) {
        Categories category = new Categories();
        category.setName(resource.name());
        category.setColor(resource.color());
        category.setUserId(userId);
        return categoriesRepository.save(category);
    }

    @Override
    public Categories update(Long id, UpdateCategoriesResource resource, Long userId) {
        Categories category = categoriesRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Category not found or user not authorized"));
        category.setName(resource.name());
        category.setColor(resource.color());
        return categoriesRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        categoriesRepository.deleteById(id);
    }
}