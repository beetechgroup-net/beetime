package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.UUID;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;

@ApplicationScoped
public class FindTaskByIdService {

    private final TaskRepository taskRepository;

    public FindTaskByIdService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(UUID id) {
        return this.taskRepository.findById(id);
    }
}
