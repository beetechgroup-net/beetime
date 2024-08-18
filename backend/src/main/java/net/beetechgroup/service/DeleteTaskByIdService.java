package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.UUID;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;
@ApplicationScoped
public class DeleteTaskByIdService {

    private final TaskRepository taskRepository;

    public DeleteTaskByIdService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Task execute(UUID id) {
        Task task = this.taskRepository.findById(id);
        this.taskRepository.delete(task);
        return task;
    }
}
