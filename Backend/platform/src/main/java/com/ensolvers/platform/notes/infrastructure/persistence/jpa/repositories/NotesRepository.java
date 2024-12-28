package com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories;

import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {
    List<Notes> findAllByArchived(Boolean archived);
}