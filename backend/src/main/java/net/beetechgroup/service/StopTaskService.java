package net.beetechgroup.service;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.UUID;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;

@ApplicationScoped
public class StopTaskService {

    private final TaskRepository taskRepository;

    public StopTaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Transactional
    public Task execute(UUID id){
        Task task = this.taskRepository.findById(id);
        task.stop();
        this.taskRepository.persistAndFlush(task);
        return task;
    }

}
