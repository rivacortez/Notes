package com.ensolvers.platform.iam.interfaces.rest.resources;

/**
 * Authenticated user resource.
 */
public record AuthenticatedUserResource(Long id, String username, String token) {
}
