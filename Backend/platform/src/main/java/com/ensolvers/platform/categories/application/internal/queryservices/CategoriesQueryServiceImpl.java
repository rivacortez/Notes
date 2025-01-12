package com.ensolvers.platform.categories.application.internal.queryservices;


import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategory;
import com.ensolvers.platform.categories.domain.services.CategoriesQueryService;
import com.ensolvers.platform.categories.infrastructure.persistence.jpa.repositories.CategoriesRepository;
import org.springframework.stereotype.Service;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import java.util.List;

@Service
public class CategoriesQueryServiceImpl implements CategoriesQueryService {
    private final CategoriesRepository categoriesRepository;

    public CategoriesQueryServiceImpl(CategoriesRepository categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    @Override
    public List<Categories> findAll() {
        return categoriesRepository.findAll();
    }

    @Override
    public List<Categories> findAllByUserId(Long userId) {
        return categoriesRepository.findAllByUserId(userId);
    }

    @Override
    public List<Notes> getNotesOfCategory(Long categoryId) {
        Categories category = categoriesRepository.findById(categoryId).orElseThrow();
        return category.getNoteCategories().stream()
                .map(NoteCategory::getNote)
                .toList();
    }
}