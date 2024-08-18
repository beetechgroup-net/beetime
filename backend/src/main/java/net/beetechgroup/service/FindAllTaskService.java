package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;

@ApplicationScoped
public class FindAllTaskService {
    private final TaskRepository taskRepository;

    public FindAllTaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> execute() {
        return this.taskRepository.findAll().stream().toList();
    }
}
