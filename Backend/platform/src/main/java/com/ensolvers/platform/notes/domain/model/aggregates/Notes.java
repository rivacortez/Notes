package com.ensolvers.platform.notes.domain.model.aggregates;


import com.ensolvers.platform.categories.domain.model.aggregates.NoteCategory;
import com.ensolvers.platform.shared.domain.model.entities.AuditableModel;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Notes extends AuditableModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Boolean archived = false;

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NoteCategory> noteCategories = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Set<NoteCategory> getNoteCategories() {
        return noteCategories;
    }

    public void setNoteCategories(Set<NoteCategory> noteCategories) {
        this.noteCategories = noteCategories;
    }
}