package net.beetechgroup.resource;

import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import net.beetechgroup.entity.Task;
import net.beetechgroup.repository.TaskRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Path("/api/tasks")
@ApplicationScoped
@RequiredArgsConstructor
public class TasksResource {

    private final TaskRepository taskRepository;
    private final JsonWebToken idToken;

    @POST
    @Authenticated
    @Transactional
    public Response create(Task task) {
        String email = idToken.getClaim("email");
        task.setUserId(email);
        task.create();
        this.taskRepository.persist(task);
        return Response.created(URI.create("/task/" + 1)).entity(task).build();
    }

    @GET
    @Authenticated
    public Response retrieveAll() {
        String email = idToken.getClaim("email");
        List<Task> tasks = this.taskRepository.find("userId", email).stream().toList();
        return Response.ok(tasks).build();
    }

    @GET
    @Path("/{id}")
    public Response retrieveById(@PathParam("id") UUID id) {
        String email = idToken.getClaim("email");
        Task task = this.taskRepository.find("id and user.email", id, email).firstResult();
        return Response.ok(task).build();
    }

    @PUT
    @Path("/{id}/start")
    @Transactional
    public Response start(@PathParam("id") UUID id) {
        Task task = this.taskRepository.findById(id);
        task.start();
        this.taskRepository.persist(task);
        return Response.ok(task).build();
    }

    @PUT
    @Path("/{id}/stop")
    @Transactional
    public Response stop(@PathParam("id") UUID id) {
        Task task = this.taskRepository.findById(id);
        task.stop();
        this.taskRepository.persist(task);
        return Response.ok(task).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteById(@PathParam("id") UUID id) {
        Task task = this.taskRepository.find("id", id).firstResult();
        this.taskRepository.delete(task);
        return Response.ok(task).build();
    }

}
