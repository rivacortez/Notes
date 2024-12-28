package com.ensolvers.platform.categories.infrastructure.persistence.jpa.repositories;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long> {
}