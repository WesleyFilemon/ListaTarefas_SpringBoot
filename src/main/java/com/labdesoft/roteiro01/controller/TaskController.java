package com.labdesoft.roteiro01.controller;

import com.labdesoft.roteiro01.entity.Task;
import com.labdesoft.roteiro01.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
@Validated
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    @Operation(summary = "Lista todas as tarefas da lista")
    public ResponseEntity<List<Task>> listAll(Pageable pageable) {
        Page<Task> tasks = taskService.listAll(pageable);
        if (tasks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks.getContent(), HttpStatus.OK);
    }

    @GetMapping("/completed")
    @Operation(summary = "Lista todas as tarefas completas")
    public ResponseEntity<List<Task>> listCompletedTasks(Pageable pageable) {
        Page<Task> tasks = taskService.listCompletedTasks(pageable);
        if (tasks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks.getContent(), HttpStatus.OK);
    }

    @GetMapping("/incomplete")
    @Operation(summary = "Lista todas as tarefas incompletas")
    public ResponseEntity<List<Task>> listIncompleteTasks(Pageable pageable) {
        Page<Task> tasks = taskService.listIncompleteTasks(pageable);
        if (tasks.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(tasks.getContent(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Retorna uma tarefa específica pelo ID")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @Operation(summary = "Cria uma nova tarefa")
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualiza uma tarefa existente pelo ID")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task task) {
        task.setId(id);
        Task updatedTask = taskService.updateTask(task);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Exclui uma tarefa existente pelo ID")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTask(id);
        return new ResponseEntity<>(deleted ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND);
    }
}
