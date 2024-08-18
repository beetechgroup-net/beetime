package net.beetechgroup.resource;

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
import net.beetechgroup.entity.Task;
import net.beetechgroup.service.CreateTaskService;
import net.beetechgroup.service.DeleteTaskByIdService;
import net.beetechgroup.service.FindAllTaskService;
import net.beetechgroup.service.FindTaskByIdService;
import net.beetechgroup.service.StartTaskService;
import net.beetechgroup.service.StopTaskService;

@Path("/tasks")
@ApplicationScoped
public class TaskResource {

    private final CreateTaskService createTaskService;
    private final StartTaskService startTaskService;
    private final StopTaskService stopTaskService;
    private final FindAllTaskService findAllTaskService;
    private final FindTaskByIdService findTaskByIdService;
    private final DeleteTaskByIdService deleteTaskByIdService;

    public TaskResource(CreateTaskService createTaskService, StartTaskService startTaskService,
            StopTaskService stopTaskService, FindAllTaskService findAllTaskService,
            FindTaskByIdService findTaskByIdService, DeleteTaskByIdService deleteTaskByIdService) {
        this.startTaskService = startTaskService;
        this.createTaskService = createTaskService;
        this.stopTaskService = stopTaskService;
        this.findAllTaskService = findAllTaskService;
        this.findTaskByIdService = findTaskByIdService;
        this.deleteTaskByIdService = deleteTaskByIdService;
    }

    @POST
    @Transactional
    public Response create(Task task) {
        Task created = this.createTaskService.execute(task);
        return Response.created(URI.create("/task/" + 1)).entity(created).build();
    }

    @GET
    public Response retrieveAll() {
        List<Task> tasks = this.findAllTaskService.execute();
        return Response.ok(tasks).build();
    }

    @GET
    @Path("/{id}")
    public Response retrieveById(@PathParam("id") UUID id) {
        Task task = this.findTaskByIdService.execute(id);
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
