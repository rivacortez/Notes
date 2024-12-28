package com.ensolvers.platform.iam.application.internal.queryservices;

import com.ensolvers.platform.iam.domain.model.aggregates.User;
import com.ensolvers.platform.iam.domain.model.queries.GetAllUsersQuery;
import com.ensolvers.platform.iam.domain.model.queries.GetUserByIdQuery;
import com.ensolvers.platform.iam.domain.model.queries.GetUserByUsernameQuery;
import com.ensolvers.platform.iam.domain.services.UserQueryService;
import com.ensolvers.platform.iam.infrastructure.persistence.jpa.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Implementation of {@link UserQueryService} interface.
 */
@Service
public class UserQueryServiceImpl implements UserQueryService {
    private final UserRepository userRepository;

    /**
     * Constructor.
     *
     * @param userRepository {@link UserRepository} instance.
     */
    public UserQueryServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // inherited javadoc
    @Override
    public List<User> handle(GetAllUsersQuery query) {
        return userRepository.findAll();
    }

    // inherited javadoc
    @Override
    public Optional<User> handle(GetUserByIdQuery query) {
        return userRepository.findById(query.userId());
    }

    // inherited javadoc
    @Override
    public Optional<User> handle(GetUserByUsernameQuery query) {
        return userRepository.findByUsername(query.username());
    }
}
