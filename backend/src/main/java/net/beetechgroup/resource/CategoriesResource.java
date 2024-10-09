package net.beetechgroup.resource;

import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Sort;
import io.quarkus.panache.common.Sort.Direction;
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
            @QueryParam("pageSize") @DefaultValue("10") Integer pageSize,
            @QueryParam("orderBy") @DefaultValue("registrationDate") String orderBy,
            @QueryParam("sortDirection") @DefaultValue("Descending") String sortDirection
    ) {
        String email = idToken.getClaim("email");
//        Sort sort = Sort.by(orderBy, Direction.Descending);
        List<Category> categories =
                this.categoryRepository
                        .find("userId = ?1", email)
                        .page(Page.of(page, pageSize))
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
