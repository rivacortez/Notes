package com.ensolvers.platform.categories.interfaces.rest;


import com.ensolvers.platform.categories.domain.model.aggregates.Categories;
import com.ensolvers.platform.categories.domain.services.CategoriesCommandService;
import com.ensolvers.platform.categories.domain.services.CategoriesQueryService;
import com.ensolvers.platform.categories.interfaces.rest.resources.CategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.CreateCategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.resources.UpdateCategoriesResource;
import com.ensolvers.platform.categories.interfaces.rest.transform.CategoriesResourceFromEntityAssembler;
import com.ensolvers.platform.iam.infrastructure.authorization.sfs.model.UserDetailsImpl;
import com.ensolvers.platform.notes.interfaces.rest.resources.NotesResource;
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
import com.ensolvers.platform.notes.domain.model.aggregates.Notes;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * CategoriesController
 * <p>
 *     All category related endpoints.
 * </p>
 */
@RestController
@RequestMapping(value = "/api/v1/categories", produces = APPLICATION_JSON_VALUE)
@Tag(name = "Categories", description = "Available Category Endpoints")
public class CategoriesController {
    private final CategoriesCommandService categoriesCommandService;
    private final CategoriesQueryService categoriesQueryService;

    /**
     * Constructor
     *
     * @param categoriesCommandService The {@link CategoriesCommandService} instance
     * @param categoriesQueryService   The {@link CategoriesQueryService} instance
     */
    public CategoriesController(CategoriesCommandService categoriesCommandService, CategoriesQueryService categoriesQueryService) {
        this.categoriesCommandService = categoriesCommandService;
        this.categoriesQueryService = categoriesQueryService;
    }

    /**
     * Create a new category
     *
     * @param resource The {@link CategoriesResource} instance
     * @return The {@link CategoriesResource} resource for the created category
     */
    @PostMapping
    @Operation(summary = "Create a new category", description = "Create a new category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category created"),
            @ApiResponse(responseCode = "400", description = "Invalid input")})
    public ResponseEntity<CategoriesResource> createCategory(@RequestBody CreateCategoriesResource resource, Authentication authentication) {
        Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
        Categories category = categoriesCommandService.create(resource, userId);
        CategoriesResource categoriesResource = CategoriesResourceFromEntityAssembler.toResourceFromEntity(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriesResource);
    }

    /**
     * Update category
     *
     * @param id The category id
     * @param resource The {@link CategoriesResource} instance
     * @return The {@link CategoriesResource} resource for the updated category
     */

    @PutMapping("/{id}")
    @Operation(summary = "Update category", description = "Update category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category updated"),
            @ApiResponse(responseCode = "404", description = "Category not found")})
    public ResponseEntity<CategoriesResource> updateCategory(@PathVariable Long id, @RequestBody UpdateCategoriesResource resource, Authentication authentication) {
        Long userId = ((UserDetailsImpl) authentication.getPrincipal()).getId();
        Categories category = categoriesCommandService.update(id, resource, userId);
        CategoriesResource categoriesResource = CategoriesResourceFromEntityAssembler.toResourceFromEntity(category);
        return ResponseEntity.ok(categoriesResource);
    }

    /**
     * Delete category
     *
     * @param id The category id
     * @return The message for the deleted category
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete category", description = "Delete category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category deleted"),
            @ApiResponse(responseCode = "404", description = "Category not found")})
    public ResponseEntity<MessageResource> deleteCategory(@PathVariable Long id) {
        categoriesCommandService.delete(id);
        return ResponseEntity.ok(new MessageResource("Category deleted successfully"));
    }

    /**
     * Get all categories
     *
     * @return The list of {@link CategoriesResource} resources for all categories
     */
    @GetMapping
    @Operation(summary = "Get all categories", description = "Get all categories")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Categories found"),
            @ApiResponse(responseCode = "404", description = "Categories not found")})
    public ResponseEntity<List<CategoriesResource>> getAllCategories() {
        List<Categories> categories = categoriesQueryService.findAll();
        List<CategoriesResource> categoriesResources = categories.stream()
                .map(CategoriesResourceFromEntityAssembler::toResourceFromEntity)
                .toList();
        return ResponseEntity.ok(categoriesResources);
    }


    @GetMapping("/{categoryId}/notes")
    @Operation(summary = "Get notes of a category", description = "Get notes associated with a category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notes found"),
            @ApiResponse(responseCode = "404", description = "Category not found")})
    public ResponseEntity<List<NotesResource>> getNotesOfCategory(@PathVariable Long categoryId) {
        List<Notes> notes = categoriesQueryService.getNotesOfCategory(categoryId);
        List<NotesResource> notesResources = notes.stream()
                .map(NotesResourceFromEntityAssembler::toResourceFromEntity)
                .toList();
        return ResponseEntity.ok(notesResources);
    }

}