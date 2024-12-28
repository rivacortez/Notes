package com.ensolvers.platform.notes.domain.model.commands;


public record NotesCommand(String title, String content, Boolean archived) {
    public NotesCommand(String title, String content) {
        this(title, content, false);
    }
}