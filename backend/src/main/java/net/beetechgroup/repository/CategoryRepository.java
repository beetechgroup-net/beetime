package net.beetechgroup.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.UUID;
import net.beetechgroup.entity.Category;
import net.beetechgroup.entity.Task;

@ApplicationScoped
public class CategoryRepository implements PanacheRepositoryBase<Category, UUID> {

}
