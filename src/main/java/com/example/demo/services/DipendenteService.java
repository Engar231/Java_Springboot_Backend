package com.example.demo.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.entities.Dipendente;
import com.example.demo.repositories.IDipendenteRepository;

@Service
public class DipendenteService {
	
	private final IDipendenteRepository dipendenteRepo;
	
	public DipendenteService(IDipendenteRepository personaRepo)
	{
		this.dipendenteRepo=personaRepo;
	}
	

	public Dipendente inserimentoDipendente(Dipendente d)
	{
		return dipendenteRepo.save(d);
	}

	public List<Dipendente> selezionaTutti() {
		return dipendenteRepo.findAll();
	}




	public void eliminatoID(Integer id) {
		dipendenteRepo.deleteById(id);
	}


	public Dipendente selezionaID(Integer id) {
		Dipendente d= dipendenteRepo.findById(id)
				   .orElseThrow(()-> new IllegalArgumentException("Persona non trovata!") );
		return d;
	}


	public Dipendente modificaD(Dipendente d) {
		return dipendenteRepo.save(d);
	}

	public boolean usernameGiaPresente(String username) {
		return dipendenteRepo.existsByUser_Username(username);
	}

	public boolean emailGiaPresente(String email) {
		return dipendenteRepo.existsByUser_Email(email);
	}
}
