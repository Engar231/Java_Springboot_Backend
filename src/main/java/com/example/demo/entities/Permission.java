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
    @Column(name="permission_type" ,nullable = false)
    private PermissionType type;

    @OneToMany(mappedBy = "permission")
    private Set<User> users;
}
