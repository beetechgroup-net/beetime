package net.beetechgroup.resource;

import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import net.beetechgroup.entity.Project;
import net.beetechgroup.repository.ProjectRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.hibernate.Hibernate;

@Path("/api/projects")
@ApplicationScoped
@RequiredArgsConstructor
public class ProjectResource {

    private final JsonWebToken idToken;
    private final ProjectRepository projectRepository;

    @POST
    @Authenticated
    @Transactional
    public Response create(Project project) {
        String email = idToken.getClaim("email");

        project.addManagers(Set.of(email));

        this.projectRepository.persist(project);

        initializeRelationsToAvoidLazyExceptions(project);

        return Response.created(URI.create("/project/" + 1)).entity(project).build();
    }

    @POST()
    @Path("/{id}/add-members")
    @Authenticated
    @Transactional
    public Response addMembers(@PathParam(value = "id") UUID uuid, Set<String> members) {
        Project project = projectRepository.findById(uuid);

        project.addMembers(members);

        this.projectRepository.persist(project);

        initializeRelationsToAvoidLazyExceptions(project);

        return Response.ok().entity(project).build();
    }

    @POST()
    @Path("/{id}/add-managers")
    @Authenticated
    @Transactional
    public Response addManagers(@PathParam(value = "id") UUID uuid, Set<String> managers) {
        Project project = projectRepository.findById(uuid);

        project.addManagers(managers);

        this.projectRepository.persist(project);

        initializeRelationsToAvoidLazyExceptions(project);

        return Response.ok().entity(project).build();
    }

    @POST()
    @Path("/{id}/remove-members")
    @Authenticated
    @Transactional
    public Response removeMembers(@PathParam(value = "id") UUID uuid, Set<String> members) {
        Project project = projectRepository.findById(uuid);

        project.removeMembers(members);

        this.projectRepository.persist(project);

        initializeRelationsToAvoidLazyExceptions(project);

        return Response.ok().entity(project).build();
    }

    @POST()
    @Path("/{id}/remove-managers")
    @Authenticated
    @Transactional
    public Response removeManagers(@PathParam(value = "id") UUID uuid, Set<String> managers) {
        Project project = projectRepository.findById(uuid);

        project.removeManagers(managers);

        this.projectRepository.persist(project);

        initializeRelationsToAvoidLazyExceptions(project);

        return Response.ok().entity(project).build();
    }

    private static void initializeRelationsToAvoidLazyExceptions(Project project) {
        Hibernate.initialize(project.getManagers());
        Hibernate.initialize(project.getMembers());
    }

}
