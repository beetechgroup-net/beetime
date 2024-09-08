package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.UUID;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;

@ApplicationScoped
public class FindTaskByIdAndUserIdService {

    private final TaskRepository taskRepository;

    public FindTaskByIdAndUserIdService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(UUID id, String userId) {
        return this.taskRepository.find("id and user.email", id, userId).firstResult();
    }
}
