package com.example.demo.repository;

import com.example.demo.entities.Permission;
import com.example.demo.entities.PermissionType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface IPermissionRepository extends JpaRepository<Permission, Integer> {
    Optional<Permission> findByType(PermissionType type);
}