package net.beetechgroup.entity;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project extends BaseEntity {

    private String name;
    @ElementCollection
    private Set<String> managers = new HashSet<>();
    @ElementCollection
    private Set<String> members = new HashSet<>();

    public void addMembers(Set<String> members) {
        this.members.addAll(members);
    }

    public void addManagers(Set<String> managers) {
        this.managers.addAll(managers);
    }

    public void removeMembers(Set<String> members) {
        this.members.removeAll(members);
    }

    public void removeManagers(Set<String> managers) {
        this.managers.removeAll(managers);
    }
}
