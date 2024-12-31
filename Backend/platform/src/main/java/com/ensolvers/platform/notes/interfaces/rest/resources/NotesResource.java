package com.ensolvers.platform.notes.interfaces.rest.resources;


public record NotesResource(Long id,String title, String content, Boolean archived) {
}