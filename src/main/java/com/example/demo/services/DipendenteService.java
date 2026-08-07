package com.example.demo.services;

import java.util.List;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Dipendente;
import com.example.demo.repositories.IDipendenteRepository;

@Service
public class DipendenteService {

	private final IDipendenteRepository dipendenteRepo;

	public DipendenteService(IDipendenteRepository dipendenteRepo, PasswordEncoder passwordEncoder) {
		this.dipendenteRepo = dipendenteRepo;
	}

	public Dipendente inserimentoDipendente(Dipendente d) {
		return dipendenteRepo.save(d);
	}

	public List<Dipendente> selezionaTutti() {
		return dipendenteRepo.findAll();
	}

	public void eliminatoID(Integer id) {
		dipendenteRepo.deleteById(id);
	}

	public Dipendente selezionaID(Integer id) {
		return dipendenteRepo.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Persona non trovata!"));
	}

	public Dipendente modificaD(Dipendente d) {
		return dipendenteRepo.save(d);
	}

	//METODI PER IL GUEST

	public Dipendente findByUsername(String username) {
		return dipendenteRepo.findByUser_Username(username)
				.orElseThrow(() -> new IllegalArgumentException("Dipendente non trovato per lo username: " + username));
	}

	public void updateGuestData(Dipendente guestForm) {
		Dipendente dbDipendente = selezionaID(guestForm.getId());
		dbDipendente.setNome(guestForm.getNome());
		dbDipendente.setCognome(guestForm.getCognome());
		dipendenteRepo.save(dbDipendente);
	}
}