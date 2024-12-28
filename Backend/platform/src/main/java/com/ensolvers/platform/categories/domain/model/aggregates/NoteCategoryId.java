package com.ensolvers.platform.categories.domain.model.aggregates;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class NoteCategoryId implements Serializable {
    private Long noteId;
    private Long categoryId;

    // Default constructor, getters, setters, equals, and hashCode methods
    public NoteCategoryId() {}

    public NoteCategoryId(Long noteId, Long categoryId) {
        this.noteId = noteId;
        this.categoryId = categoryId;
    }

    // Getters and setters

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NoteCategoryId that = (NoteCategoryId) o;
        return Objects.equals(noteId, that.noteId) && Objects.equals(categoryId, that.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(noteId, categoryId);
    }
}