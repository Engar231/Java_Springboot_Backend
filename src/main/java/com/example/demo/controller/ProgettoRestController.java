package com.example.demo.controller;

import com.example.demo.entities.Dipendente;
import com.example.demo.entities.Progetto;
import com.example.demo.repositories.IDipendenteRepository;
import com.example.demo.repositories.IProgettoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/progetti")
public class ProgettoRestController {

    @Autowired
    private IProgettoRepository progettoRepository;

    @Autowired
    private IDipendenteRepository dipendenteRepository;

    @GetMapping("/{id}/dipendenti-split")
    @Transactional(readOnly = true)
    public ResponseEntity<Map<String, List<Map<String, Object>>>> getDipendentiSplit(@PathVariable Long id) {
        Progetto progetto = progettoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Progetto non trovato"));

        // Usa la query ottimizzata con FETCH per evitare l'effetto N+1
        List<Dipendente> tutti = dipendenteRepository.findAllConUserEPermessi();
        Set<Dipendente> assegnati = progetto.getDipendenti();

        List<Map<String, Object>> assegnatiDTO = assegnati.stream().map(this::mapDipendente).collect(Collectors.toList());
        List<Map<String, Object>> nonAssegnatiDTO = tutti.stream()
                .filter(d -> !assegnati.contains(d))
                .map(this::mapDipendente)
                .collect(Collectors.toList());

        Map<String, List<Map<String, Object>>> response = new HashMap<>();
        response.put("nonAssegnati", nonAssegnatiDTO);
        response.put("assegnati", assegnatiDTO);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{progettoId}/assegna/{dipendenteId}")
    @Transactional
    public ResponseEntity<?> assegnaDipendente(@PathVariable Long progettoId, @PathVariable Integer dipendenteId) {
        Progetto p = progettoRepository.findById(progettoId).orElseThrow();
        Dipendente d = dipendenteRepository.findById(dipendenteId).orElseThrow();

        p.addDipendente(d);
        progettoRepository.save(p);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/{progettoId}/rimuovi/{dipendenteId}")
    @Transactional
    public ResponseEntity<?> rimuoviDipendente(@PathVariable Long progettoId, @PathVariable Integer dipendenteId) {
        Progetto p = progettoRepository.findById(progettoId).orElseThrow();
        Dipendente d = dipendenteRepository.findById(dipendenteId).orElseThrow();

        p.removeDipendente(d);
        progettoRepository.save(p);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> eliminaProgetto(@PathVariable Long id) {
        Progetto p = progettoRepository.findById(id).orElseThrow();
        if (!p.getDipendenti().isEmpty()) {
            return ResponseEntity.badRequest().body("Impossibile eliminare: ci sono dipendenti assegnati!");
        }
        progettoRepository.delete(p);
        return ResponseEntity.ok().build();
    }

    private Map<String, Object> mapDipendente(Dipendente d) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", d.getId());
        map.put("nome", d.getNome());
        map.put("cognome", d.getCognome());
        map.put("cf", d.getCf());
        map.put("email", d.getUser() != null ? d.getUser().getEmail() : "N/A");
        return map;
    }
}