package net.beetechgroup.resource;

import java.util.List;

public record PaginatedResult<T>(List<T> results, Long total) {

}
