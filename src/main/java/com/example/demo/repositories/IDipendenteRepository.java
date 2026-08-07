package com.example.demo.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entities.Dipendente;
import org.springframework.data.jpa.repository.Query;

public interface IDipendenteRepository extends JpaRepository<Dipendente, Integer> {
	Optional<Dipendente> findByUser_Username(String username);
	@Query("SELECT DISTINCT d FROM Dipendente d LEFT JOIN FETCH d.user u LEFT JOIN FETCH u.permission")
	List<Dipendente> findAllConUserEPermessi();
}
