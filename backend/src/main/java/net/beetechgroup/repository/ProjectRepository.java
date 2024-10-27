package net.beetechgroup.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.UUID;
import net.beetechgroup.entity.Project;
import net.beetechgroup.entity.UserEntity;

@ApplicationScoped
public class ProjectRepository implements PanacheRepositoryBase<Project, UUID> {

}
