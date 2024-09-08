package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;

@ApplicationScoped
public class FindAllTasksByUserIdService {
    private final TaskRepository taskRepository;

    public FindAllTasksByUserIdService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> execute(String userId) {
        return this.taskRepository.find("user.email", userId).stream().toList();
    }
}
