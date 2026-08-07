package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    // Qui in futuro potrai aggiungere metodi come findByUsername
    Optional<User> findByUsername(String username);
}
