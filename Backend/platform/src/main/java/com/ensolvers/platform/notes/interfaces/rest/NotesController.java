package com.ensolvers.platform.notes.interfaces.rest;

import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.transform.CategoriesResourceFromEntityAssembler;
import com.ensolvers.platform.iam.infrastructure.authorization.sfs.model.UserDetailsImpl;
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import com.ensolvers.platform.notes.domain.model.commands.NotesCommand;
import com.ensolvers.platform.notes.domain.services.NotesCommandService;
import com.ensolvers.platform.notes.domain.services.NotesQueryService;
import com.ensolvers.platform.notes.interfaces.rest.resources.CreateNotesResource;
import com.ensolvers.platform.notes.interfaces.rest.resources.NotesResource;
import com.ensolvers.platform.notes.interfaces.rest.resources.UpdateNotesResource;
import com.ensolvers.platform.notes.interfaces.rest.transform.NotesResourceFromEntityAssembler;
import com.ensolvers.platform.shared.interfaces.rest.resources.MessageResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api/v1/notes", produces = APPLICATION_JSON_VALUE)
@Tag(name = "Notes", description = "Available Notes Endpoints")
public class NotesController {
    private final NotesCommandService notesCommandService;
    private final NotesQueryService notesQueryService;

    public NotesController(NotesCommandService notesCommandService, NotesQueryService notesQueryService) {
        this.notesCommandService = notesCommandService;
        this.notesQueryService = notesQueryService;
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a note", description = "Delete a note")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note deleted"),
            @ApiResponse(responseCode = "404", description = "Note not found")})
    public ResponseEntity<MessageResource> deleteNote(@PathVariable Long id, Authentication authentication) {
        Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
        notesCommandService.delete(id, userId);
        return ResponseEntity.ok(new MessageResource("Note deleted successfully"));
    }

    @PostMapping
    @Operation(summary = "Create a new note", description = "Create a new note")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Note created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<NotesResource> createNote(@RequestBody CreateNotesResource resource, Authentication authentication) {
        Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
        NotesCommand command = new NotesCommand(resource.title(), resource.content(), resource.archived(), resource.idCategories());
        Notes note = notesCommandService.create(command, userId);

        for (Long categoryId : resource.idCategories()) {
            notesCommandService.associateWithCategory(note.getId(), categoryId);
        }

        NotesResource notesResource = NotesResourceFromEntityAssembler.toResourceFromEntity(note);
        return new ResponseEntity<>(notesResource, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a note", description = "Update a note")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note updated"),
            @ApiResponse(responseCode = "404", description = "Note not found")})
    public ResponseEntity<NotesResource> updateNote(@PathVariable Long id, @RequestBody UpdateNotesResource resource, Authentication authentication) {
        Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
        NotesCommand command = new NotesCommand(resource.title(), resource.content(), resource.archived(), resource.idCategories());
        Notes note = notesCommandService.update(id, command, userId);
        notesCommandService.disassociateAllCategories(id);
        for (Long categoryId : resource.idCategories()) {
            notesCommandService.associateWithCategory(id, categoryId);
        }
        NotesResource notesResource = NotesResourceFromEntityAssembler.toResourceFromEntity(note);
        return ResponseEntity.ok(notesResource);
    }

    @PatchMapping("/{id}/archive")
    @Operation(summary = "Archive note", description = "Archive or unarchive a note")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Note archived status updated"),
            @ApiResponse(responseCode = "404", description = "Note not found")})
    public ResponseEntity<Boolean> archiveNote(@PathVariable Long id, @RequestParam Boolean archived) {
        var note = notesCommandService.archive(id, archived);
        return ResponseEntity.ok(note.getArchived());
    }

    @GetMapping
    @Operation(summary = "Get all notes for the authenticated user", description = "Get all notes for the authenticated user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")})
    public ResponseEntity<List<NotesResource>> getAllNotesForUser(Authentication authentication) {
        Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
        List<Notes> notes = notesQueryService.findAllByUserId(userId);
        List<NotesResource> notesResources = notes.stream()
                .map(NotesResourceFromEntityAssembler::toResourceFromEntity)
                .toList();
        return ResponseEntity.ok(notesResources);
    }

    @PostMapping("/{noteId}/categories/{categoryId}")
    @Operation(summary = "Associate a note with a category", description = "Associate a note with a category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Note associated with category successfully"),
            @ApiResponse(responseCode = "404", description = "Note or category not found")})
    public ResponseEntity<MessageResource> associateNoteWithCategory(@PathVariable Long noteId, @PathVariable Long categoryId) {
        notesCommandService.associateWithCategory(noteId, categoryId);
        return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResource("The note was successfully associated with the category."));
    }

    @DeleteMapping("/{noteId}/categories/{categoryId}")
    @Operation(summary = "Disassociate a note from a category", description = "Disassociate a note from a category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Association removed successfully"),
            @ApiResponse(responseCode = "404", description = "Note or category not found")})
    public ResponseEntity<Void> disassociateNoteFromCategory(@PathVariable Long noteId, @PathVariable Long categoryId) {
        notesCommandService.disassociateFromCategory(noteId, categoryId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{noteId}/categories")
    @Operation(summary = "Get categories of a note", description = "Get categories associated with a note")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found"),
            @ApiResponse(responseCode = "404", description = "Note not found")})
    public ResponseEntity<List<CategoriesResource>> getCategoriesOfNote(@PathVariable Long noteId) {
        List<Categories> categories = notesQueryService.getCategoriesOfNote(noteId);
        List<CategoriesResource> categoriesResources = categories.stream()
                .map(CategoriesResourceFromEntityAssembler::toResourceFromEntity)
                .toList();
        return ResponseEntity.ok(categoriesResources);
    }
}