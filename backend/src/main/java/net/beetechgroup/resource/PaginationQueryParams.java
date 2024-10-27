package net.beetechgroup.resource;

import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.QueryParam;

public class PaginationQueryParams {
    @QueryParam("page")
    @DefaultValue("0")
    Integer page;
    @QueryParam("pageSize")
    @DefaultValue("10")
    Integer pageSize;
    @QueryParam("orderBy")
    @DefaultValue("registrationDate")
    String orderBy;
    @QueryParam("sortDirection")
    @DefaultValue("Descending")
    String sortDirection;
}
