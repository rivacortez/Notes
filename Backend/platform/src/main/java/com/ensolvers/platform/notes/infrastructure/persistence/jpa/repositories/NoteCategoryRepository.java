package com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories;

import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategory;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteCategoryRepository extends JpaRepository<NoteCategory, NoteCategoryId> {
}