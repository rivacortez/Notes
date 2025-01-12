package com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories;

import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {
    List<Notes> findAllByArchived(Boolean archived);
    List<Notes> findAllByUserId(Long userId);
    Optional<Notes> findByIdAndUserId(Long id, Long userId);
}