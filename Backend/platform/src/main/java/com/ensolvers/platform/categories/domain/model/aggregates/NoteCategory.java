package com.ensolvers.platform.categories.domain.model.aggregates;


import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "note_category")
public class NoteCategory {
    @EmbeddedId
    private NoteCategoryId id;

    @ManyToOne
    @MapsId("noteId")
    @JoinColumn(name = "note_id")
    private Notes note;

    @ManyToOne
    @MapsId("categoryId")
    @JoinColumn(name = "category_id")
    private Categories category;

    public NoteCategory(NoteCategoryId id, Notes note, Categories category) {
        this.id = id;
        this.note = note;
        this.category = category;
    }

    public NoteCategory() {}

    public Categories getCategory() {
        return category;
    }
    public Notes getNote() {
        return note;
    }
}