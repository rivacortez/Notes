package com.ensolvers.platform.categories.infrastructure.persistence.jpa.repositories;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long> {
    Optional<Categories> findByIdAndUserId(Long id, Long userId);
}