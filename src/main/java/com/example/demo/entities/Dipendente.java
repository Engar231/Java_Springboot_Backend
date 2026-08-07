package com.example.demo.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name="dipendenti")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class Dipendente extends Persona {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	private double stipendio;

	@Column(name="data_di_assunzione", nullable = false)
	@DateTimeFormat(iso=DateTimeFormat.ISO.DATE)
	private LocalDate dataDiAssunzione;

	@Enumerated(EnumType.STRING)
	@Column(name="ruolo", nullable = false)
	private Ruolo tipoRuolo;

	public Dipendente(Integer id, String nome, String cognome, String cf, LocalDate dataDiNascita, double stipendio, LocalDate dataDiAssunzione, Ruolo tipoRuolo) {
		super(nome,cognome,cf,dataDiNascita);
		this.id = id;
		this.stipendio = stipendio;
		this.dataDiAssunzione = dataDiAssunzione;
		this.tipoRuolo = tipoRuolo;
	}

	public Dipendente() {
	}

	@OneToOne(fetch=FetchType.EAGER, cascade = {CascadeType.REMOVE, CascadeType.PERSIST, CascadeType.MERGE})
	@JoinColumn(name="id_user", nullable=false, foreignKey = @ForeignKey(name="fk_dipendente_user"))
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private User user;

	@ManyToMany(mappedBy = "dipendenti")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Set<Progetto> progetti = new HashSet<>();

	@PreRemove
	private void removeDipendenteFromProgetti() {
		for (Progetto p : new HashSet<>(progetti)) {
			p.getDipendenti().remove(this);
		}
	}

	public Set<Progetto> getProgetti() {
		return progetti;
	}

	public void setProgetti(Set<Progetto> progetti) {
		this.progetti = progetti;
	}
}