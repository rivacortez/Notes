package com.ensolvers.platform.notes.domain.model.commands;


import java.util.List;

public record NotesCommand(String title, String content, Boolean archived, List<Long> idCategories) {
}