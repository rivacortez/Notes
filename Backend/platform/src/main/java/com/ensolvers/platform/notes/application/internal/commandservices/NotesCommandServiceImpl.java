package com.ensolvers.platform.notes.application.internal.commandservices;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategory;
import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategoryId;
import com.ensolvers.platform.categories.infrastructure.persistence.jpa.repositories.CategoriesRepository;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.model.commands.PatchNotesCommand;
import com.ensolvers.platform.notes.domain.services.NotesCommandService;
import com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories.NoteCategoryRepository;
import com.ensolvers.platform.notes.infrastructure.persistence.jpa.repositories.NotesRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NotesCommandServiceImpl implements NotesCommandService {
    private final NotesRepository notesRepository;
    private final CategoriesRepository categoriesRepository;
    private final NoteCategoryRepository noteCategoryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public NotesCommandServiceImpl(NotesRepository notesRepository, CategoriesRepository categoriesRepository,EntityManager entityManager, NoteCategoryRepository noteCategoryRepository) {
        this.notesRepository = notesRepository;
        this.categoriesRepository = categoriesRepository;
        this.entityManager = entityManager;
        this.noteCategoryRepository = noteCategoryRepository;
    }

    @Override
    @Transactional
    public Notes create(NotesCommand command, Long userId) {
        Notes note = new Notes();
        note.setTitle(command.title());
        note.setContent(command.content());
        note.setArchived(command.archived());
        note.setUserId(userId);
        notesRepository.save(note);
        return note;
    }




    @Override
    @Transactional
    public Notes update(Long id, NotesCommand command, Long userId) {
        Notes note = notesRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Note not found or user not authorized"));
        note.setTitle(command.title());
        note.setContent(command.content());
        note.setArchived(command.archived());
        return notesRepository.save(note);
    }

    @Override
    @Transactional
    public Optional<Notes> patch(Long id, PatchNotesCommand command) {
        Notes note = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        note.setArchived(command.archived());
        return Optional.of(notesRepository.save(note));
    }

    @Override
    @Transactional
    public Notes archive(Long id, Boolean archived) {
        Notes note = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        note.setArchived(archived);
        return notesRepository.save(note);
    }

    @Override
    @Transactional
    public void delete(Long id, Long userId) {
        Notes note = notesRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Note not found or user not authorized"));
        notesRepository.delete(note);
    }

    @Override
    @Transactional
    public void associateWithCategory(Long noteId, Long categoryId) {
        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        Categories category = categoriesRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        NoteCategoryId noteCategoryId = new NoteCategoryId(noteId, categoryId);
        NoteCategory noteCategory = new NoteCategory(noteCategoryId, note, category);
        noteCategoryRepository.save(noteCategory);
    }

    public void saveOrUpdate(NoteCategory noteCategory) {
        if (entityManager.contains(noteCategory)) {
            entityManager.merge(noteCategory);
        } else {
            entityManager.persist(noteCategory);
        }
    }


    @Override
    @Transactional
    public void disassociateFromCategory(Long noteId, Long categoryId) {
        NoteCategoryId noteCategoryId = new NoteCategoryId(noteId, categoryId);
        NoteCategory noteCategory = noteCategoryRepository.findById(noteCategoryId)
                .orElseThrow(() -> new RuntimeException("NoteCategory not found"));
        noteCategoryRepository.delete(noteCategory);
    }

    @Override
    @Transactional
    public void disassociateAllCategories(Long noteId) {
        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        note.getNoteCategories().clear();
        notesRepository.save(note);
    }

    @Override
    @Transactional
    public List<Notes> findAllByUserId(Long userId) {
        return notesRepository.findAllByUserId(userId);
    }

    @Override
    @Transactional
    public Optional<Notes> getNoteById(Long id) {
        return notesRepository.findById(id);
    }


}