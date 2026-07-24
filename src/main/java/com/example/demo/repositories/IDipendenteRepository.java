package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Dipendente;



public interface IDipendenteRepository extends JpaRepository<Dipendente, Integer>{
	List<Dipendente> findByNomeAndCognome(String nome, String cognome);
	//prende user anche da dipendente.
	boolean existsByUser_Username(String username);
	boolean existsByUser_Email(String email);

}
