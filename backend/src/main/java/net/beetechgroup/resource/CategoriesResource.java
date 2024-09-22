package net.beetechgroup.resource;

import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import net.beetechgroup.entity.Category;
import net.beetechgroup.entity.UserProfile;
import net.beetechgroup.repository.CategoryRepository;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Path("/api/categories")
@ApplicationScoped
@RequiredArgsConstructor
public class CategoriesResource {

    private final JsonWebToken idToken;
    private final CategoryRepository categoryRepository;

    @POST
    @Authenticated
    @Transactional
    public Response create(Category category) {
        String email = idToken.getClaim("email");
        category.setUserId(email);
        categoryRepository.persist(category);
        return Response.created(URI.create("/category/" + 1)).entity(category).build();
    }

//    TESTAR A BUSCA DE CATEGORIAS PARA O SELECT NO FRONTEND

    @GET
    @Authenticated
    public Response retrieveAll() {
        String email = idToken.getClaim("email");
        List<Category> categories = this.categoryRepository.find("userId = ?1", email).stream().toList();
        return Response.ok(categories).build();
    }

    @GET
    @Path("/{id}")
    @Authenticated
    public Response retrieveById(@PathParam("id") UUID id) {
        String email = idToken.getClaim("email");
        Category category = this.categoryRepository.find("id = ?1 and userId = ?2", id, email)
                .firstResult();
        return Response.ok(category).build();
    }
//
//    @PUT
//    @Path("/{id}/start")
//    public Response start(@PathParam("id") UUID id) {
//        Task task = this.startTaskService.execute(id);
//        return Response.ok(task).build();
//    }
//
//    @PUT
//    @Path("/{id}/stop")
//    public Response stop(@PathParam("id") UUID id) {
//        Task task = this.stopTaskService.execute(id);
//        return Response.ok(task).build();
//    }
//
//    @DELETE
//    @Path("/{id}")
//    public Response deleteById(@PathParam("id") UUID id) {
//        Task task = this.deleteTaskByIdService.execute(id);
//        return Response.ok(task).build();
//    }

}
