package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.UUID;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;

@ApplicationScoped
public class StartTaskService {

    private final TaskRepository taskRepository;

    public StartTaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional
    public Task execute(UUID id){
        Task task = this.taskRepository.findById(id);
        task.start();
        this.taskRepository.persistAndFlush(task);
        return task;
    }

}
