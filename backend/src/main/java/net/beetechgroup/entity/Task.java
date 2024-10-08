package net.beetechgroup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String description;
    @ManyToOne
    private Category category;
    private TaskStatus status;
    private LocalDateTime startTime;
    private LocalDateTime stopTime;
    private Long duration;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "registration_date")
    private LocalDateTime registrationDate = LocalDateTime.now();

    public void create() {
        this.status = TaskStatus.NOT_STARTED;
        this.duration = 0L;
    }

    public void start() {
        this.status = TaskStatus.STARTED;
        this.startTime = LocalDateTime.now();
    }

    public void stop() {
        this.status = TaskStatus.STOPPED;
        this.stopTime = LocalDateTime.now();
        this.duration = duration + Duration.between(this.startTime, this.stopTime).toMillis();
    }

}
