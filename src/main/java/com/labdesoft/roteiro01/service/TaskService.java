package com.labdesoft.roteiro01.service;

import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;


    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Page<Task> listAll(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    public Page<Task> listCompletedTasks(Pageable pageable) {
        return taskRepository.findByCompletedTrue(pageable);
    }

    public Page<Task> listIncompleteTasks(Pageable pageable) {
        return taskRepository.findByCompletedFalse(pageable);
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        validateTask(task);
        return taskRepository.save(task);
    }

    public Task updateTask(Task task) {
        validateTask(task);
        return taskRepository.save(task);
    }

    public boolean deleteTask(Long id) {
        Optional<Task> existingTask = taskRepository.findById(id);
        if (existingTask.isPresent()) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private void validateTask(Task task) {
        if (task.getTaskType() == Task.TaskType.DATA) {
            if (task.getDueDate() == null) {
                throw new IllegalArgumentException("Data prevista de execução deve ser fornecida para tarefas do tipo DATA.");
            }

            /////requisito para dias de atraso
            if (task.getDueDate().isBefore(LocalDate.now())) {
                throw new IllegalArgumentException("Data prevista de execução deve ser igual ou superior a data atual.");
            }
        } else {
            task.setDueDate(null); 
        }
        if (task.getTaskType() == Task.TaskType.PRAZO && task.getDaysToComplete() == null) {
            throw new IllegalArgumentException("Prazo de conclusão deve ser fornecido para tarefas do tipo PRAZO.");
        }
        if (task.getPriority() == null) {
            task.setPriority(Task.Priority.MEDIA); 
        }
    }
}
