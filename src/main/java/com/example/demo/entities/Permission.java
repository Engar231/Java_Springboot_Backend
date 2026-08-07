package com.example.demo.entities;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name="permission_type" ,nullable = false, unique = true)
    private PermissionType type;

    @OneToMany(mappedBy = "permission")
    private Set<User> users;

    public Permission() {
    }

    public Permission(PermissionType type) {
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public PermissionType getType() {
        return type;
    }

    public void setType(PermissionType type) {
        this.type = type;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
