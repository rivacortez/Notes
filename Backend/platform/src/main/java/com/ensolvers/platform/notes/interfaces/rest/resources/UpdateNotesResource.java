package com.ensolvers.platform.notes.interfaces.rest.resources;

import java.util.List;

public record UpdateNotesResource(String title, String content, Boolean archived, List<Long> idCategories) {
}