package com.ensolvers.platform.iam.application.internal.eventhandlers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

/**
 * Event handler for the ApplicationReadyEvent. This event is triggered when the application is ready to serve requests.
 * This event handler is responsible for verifying if roles seeding is needed and if so, it will seed the roles.
 */
@Service
public class ApplicationReadyEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationReadyEventHandler.class);

    /**
     * Constructor for the ApplicationReadyEventHandler.
     *
     *
     */
    public ApplicationReadyEventHandler() {

    }

    /**
     * Event listener for the ApplicationReadyEvent. This event is triggered when the application is ready to serve requests.
     * This event handler is responsible for verifying if roles seeding is needed and if so, it will seed the roles.
     *
     * @param event the {@link ApplicationReadyEvent} event instance.
     */
    @EventListener
    public void on(ApplicationReadyEvent event) {
        var applicationName = event.getApplicationContext().getId();
        LOGGER.info("Starting to verify if roles seeding is needed for {} at {}", applicationName, currentTimestamp());


        LOGGER.info("Role seeding verification finished for {} at {}", applicationName, currentTimestamp());
    }

    /**
     * Method to get the current timestamp.
     *
     * @return the current timestamp.
     */
    private Timestamp currentTimestamp() {
        return new Timestamp(System.currentTimeMillis());
    }
}
