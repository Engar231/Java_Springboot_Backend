package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "progetti")
public class Progetto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Il nome del progetto è obbligatorio")
    @Column(name = "nome_p", nullable = false)
    private String nomeP;

    @NotNull(message = "La data di inizio è obbligatoria")
    @Column(name = "data_start", nullable = false)
    private LocalDate dataStart;

    @Column(name = "data_fine")
    private LocalDate dataFine;

    @NotNull(message = "Il costo è obbligatorio")
    @Column(name = "costo_p", nullable = false)
    private BigDecimal costoP;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "dettagli_p", // Nome della tabella ponte
            joinColumns = @JoinColumn(name = "id_p"), // FK verso la tabella progetti
            inverseJoinColumns = @JoinColumn(name = "id_d") // FK verso la tabella dipendenti
    )
    private Set<Dipendente> dipendenti = new HashSet<>();

    // Costruttori
    public Progetto() {
    }

    public Progetto(String nomeP, LocalDate dataStart, LocalDate dataFine, BigDecimal costoP) {
        this.nomeP = nomeP;
        this.dataStart = dataStart;
        this.dataFine = dataFine;
        this.costoP = costoP;
    }

    public void addDipendente(Dipendente dipendente) {
        this.dipendenti.add(dipendente);
        dipendente.getProgetti().add(this);
    }

    public void removeDipendente(Dipendente dipendente) {
        this.dipendenti.remove(dipendente);
        dipendente.getProgetti().remove(this);
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeP() {
        return nomeP;
    }

    public void setNomeP(String nomeP) {
        this.nomeP = nomeP;
    }

    public LocalDate getDataStart() {
        return dataStart;
    }

    public void setDataStart(LocalDate dataStart) {
        this.dataStart = dataStart;
    }

    public LocalDate getDataFine() {
        return dataFine;
    }

    public void setDataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
    }

    public BigDecimal getCostoP() {
        return costoP;
    }

    public void setCostoP(BigDecimal costoP) {
        this.costoP = costoP;
    }

    public Set<Dipendente> getDipendenti() {
        return dipendenti;
    }

    public void setDipendenti(Set<Dipendente> dipendenti) {
        this.dipendenti = dipendenti;
    }
}