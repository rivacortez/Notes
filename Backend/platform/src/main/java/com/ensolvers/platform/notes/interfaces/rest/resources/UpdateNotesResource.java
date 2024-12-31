package com.ensolvers.platform.notes.interfaces.rest.resources;

public record UpdateNotesResource(String title, String content, Boolean archived) {
}