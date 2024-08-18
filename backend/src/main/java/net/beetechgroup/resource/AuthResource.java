package net.beetechgroup.resource;

import io.quarkus.oidc.IdToken;
import io.quarkus.security.Authenticated;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Path("/auth")
@ApplicationScoped
@RequiredArgsConstructor
public class AuthResource {

    @IdToken
    JsonWebToken idToken;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Authenticated
    public String hello() {
        return idToken.getClaimNames().stream().map(claim -> claim + ": " + idToken.getClaim(claim))
                .collect(
                        Collectors.joining(", "));

    }

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Path("/callback")
    @Authenticated
    public String callback() {
        return idToken.getClaimNames().stream().map(claim -> claim + ": " + idToken.getClaim(claim))
                .collect(
                        Collectors.joining(", "));
    }

}
