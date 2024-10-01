package com.labdesoft.roteiro01.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = Task.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Task {
    public static final String TABLE_NAME = "task";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", length = 255, nullable = false)
    @Size(min = 1, max = 255)
    @NotBlank
    private String description;

    @Column(name = "completed", nullable = false)
    private Boolean completed = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_type", nullable = false)
    @NotNull
    private TaskType taskType;

    @Column(name = "due_date")
    private LocalDate dueDate; 

    @Column(name = "days_to_complete")
    private Integer daysToComplete; 

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    @NotNull
    private Priority priority;

    @Transient
    private String status;

    @PostLoad
    @PostPersist
    @PostUpdate
    public void computeStatus() {
        if (completed) {
            this.status = "Concluída";
            return;
        }
        LocalDate now = LocalDate.now();
        switch (taskType) {
            case DATA:
                if (dueDate != null) {
                    if (dueDate.isAfter(now)) {
                        this.status = "Prevista";
                    } else {
                        this.status = ChronoUnit.DAYS.between(dueDate, now) + " dias de atraso";
                    }
                }
                break;
            case PRAZO:
                if (daysToComplete != null) {
                    LocalDate expectedCompletionDate = now.minusDays(daysToComplete);
                    if (expectedCompletionDate.isAfter(now)) {
                        this.status = "Prevista";
                    } else {
                        this.status = ChronoUnit.DAYS.between(expectedCompletionDate, now) + " Para entrega";
                    }
                }
                break;
            case LIVRE:
                this.status = "Prevista";
                break;
        }
    }

    public enum TaskType {
        DATA, PRAZO, LIVRE
    }

    public enum Priority {
        ALTA, MEDIA, BAIXA
    }
}
