package com.ensolvers.platform.iam.application.acl;

import com.ensolvers.platform.iam.domain.model.commands.SignUpCommand;
import com.ensolvers.platform.iam.domain.model.queries.GetUserByIdQuery;
import com.ensolvers.platform.iam.domain.model.queries.GetUserByUsernameQuery;
import com.ensolvers.platform.iam.domain.services.UserCommandService;
import com.ensolvers.platform.iam.domain.services.UserQueryService;
import com.ensolvers.platform.iam.interfaces.acl.IamContextFacade;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * IamContextFacadeImpl
 * <p>
 *     This class provides a facade to the IAM context.
 *     It is used to interact with the IAM context.
 *     It provides methods to create a user, fetch a user by username, fetch a username by user id.
 * </p>
 */
@Service
public class IamContextFacadeImpl implements IamContextFacade {
    private final UserCommandService userCommandService;
    private final UserQueryService userQueryService;

    /**
     * Constructor
     * @param userCommandService The user command service.
     * @param userQueryService The user query service.
     */
    public IamContextFacadeImpl(UserCommandService userCommandService, UserQueryService userQueryService) {
        this.userCommandService = userCommandService;
        this.userQueryService = userQueryService;
    }

    // inherited javadoc
    @Override
    public Long createUser(String username, String password) {
        var signUpCommand = new SignUpCommand(username, password);
        var result = userCommandService.handle(signUpCommand);
        if (result.isEmpty()) return 0L;
        return result.get().getId();
    }


    // inherited javadoc
    @Override
    public Long fetchUserIdByUsername(String username) {
        var getUserByUsernameQuery = new GetUserByUsernameQuery(username);
        var result = userQueryService.handle(getUserByUsernameQuery);
        if (result.isEmpty()) return 0L;
        return result.get().getId();
    }

    // inherited javadoc
    @Override
    public String fetchUsernameByUserId(Long userId) {
        var getUserByUserIdQuery = new GetUserByIdQuery(userId);
        var result = userQueryService.handle(getUserByUserIdQuery);
        if (result.isEmpty()) return Strings.EMPTY;
        return result.get().getUsername();
    }
}
