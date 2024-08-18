package net.beetechgroup.entity;

import lombok.Getter;

@Getter
public enum TaskStatus {
    NOT_STARTED("Not Started"),
    STARTED("Started"),
    STOPPED("Stopped");

    private final String description;

    TaskStatus(String description) {
        this.description = description;
    }
}
