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
import net.beetechgroup.entity.User;
import net.beetechgroup.service.CreateTaskService;
import net.beetechgroup.service.DeleteTaskByIdService;
import net.beetechgroup.service.FindAllTasksByUserIdService;
import net.beetechgroup.service.FindTaskByIdAndUserIdService;
import net.beetechgroup.service.StartTaskService;
import net.beetechgroup.service.StopTaskService;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Path("/tasks")
@ApplicationScoped
@RequiredArgsConstructor
public class TaskResource {

    private final CreateTaskService createTaskService;
    private final StartTaskService startTaskService;
    private final StopTaskService stopTaskService;
    private final FindAllTasksByUserIdService findAllTasksByUserIdService;
    private final FindTaskByIdAndUserIdService findTaskByIdAndUserIdService;
    private final DeleteTaskByIdService deleteTaskByIdService;
    private final JsonWebToken idToken;
    @POST
    @Authenticated
    @Transactional
    public Response create(Task task) {
        String email = idToken.getClaim("email");
        task.setUser(new User(email));
        Task created = this.createTaskService.execute(task);
        return Response.created(URI.create("/task/" + 1)).entity(created).build();
    }

    @GET
    @Authenticated
    public Response retrieveAll() {
        String email = idToken.getClaim("email");
        List<Task> tasks = this.findAllTasksByUserIdService.execute(email);
        return Response.ok(tasks).build();
    }

    @GET
    @Path("/{id}")
    public Response retrieveById(@PathParam("id") UUID id) {
        String email = idToken.getClaim("email");
        Task task = this.findTaskByIdAndUserIdService.execute(id, email);
        return Response.ok(task).build();
    }

    @PUT
    @Path("/{id}/start")
    public Response start(@PathParam("id") UUID id) {
        Task task = this.startTaskService.execute(id);
        return Response.ok(task).build();
    }

    @PUT
    @Path("/{id}/stop")
    public Response stop(@PathParam("id") UUID id) {
        Task task = this.stopTaskService.execute(id);
        return Response.ok(task).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteById(@PathParam("id") UUID id) {
        Task task = this.deleteTaskByIdService.execute(id);
        return Response.ok(task).build();
    }

}
