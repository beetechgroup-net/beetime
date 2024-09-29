package net.beetechgroup.resource;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import net.beetechgroup.entity.Category;
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

    @GET
    @Authenticated
    public Response retrieveAll(
            @QueryParam("page") @DefaultValue("0") Integer page,
            @QueryParam("size") @DefaultValue("10") Integer size,
            @QueryParam("orderBy") @DefaultValue("registrationDate") String orderBy,
            @QueryParam("sortDirection") @DefaultValue("Descending") String sortDirection
    ) {
        String email = idToken.getClaim("email");
        List<Category> categories =
                this.categoryRepository
                        .find("userId = ?1", email, Sort.by(orderBy, Sort.Direction.valueOf(sortDirection)))
                        .page(Page.of(page, size))
                        .list();
        long count = this.categoryRepository.count();
        return Response.ok(new PaginatedResult<>(categories, count)).build();
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

}
