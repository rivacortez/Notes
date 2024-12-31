package com.ensolvers.platform.notes.interfaces.rest.resources;

public record CreateNotesResource(String title, String content, Boolean archived) {
}