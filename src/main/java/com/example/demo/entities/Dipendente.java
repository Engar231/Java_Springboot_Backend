package com.example.demo.entities;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name="dipendenti")
@Data
@EqualsAndHashCode(callSuper = true) // includo i campi di persona
@ToString(callSuper = true)

public class Dipendente extends Persona{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	
	@Column(nullable = false)
	private double stipendio;
	
	@Column(name="data_di_assunzione", nullable = false)
	@DateTimeFormat(iso=DateTimeFormat.ISO.DATE) // per il binding da form
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
	private User user;
	
}
