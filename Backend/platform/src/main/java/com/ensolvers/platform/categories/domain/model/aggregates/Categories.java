package com.ensolvers.platform.categories.domain.model.aggregates;


import com.ensolvers.platform.shared.domain.model.entities.AuditableModel;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Categories extends AuditableModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String color;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NoteCategory> noteCategories;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Set<NoteCategory> getNoteCategories() {
        return noteCategories;
    }

    public void setNoteCategories(Set<NoteCategory> noteCategories) {
        this.noteCategories = noteCategories;
    }
}