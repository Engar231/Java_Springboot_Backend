package com.example.demo.entities;

import java.time.LocalDate;
import java.time.Period;

import org.springframework.format.annotation.DateTimeFormat;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Persona {  //POJO
	
		

    @NotBlank(message = "Il nome è obbligatorio!")
    @Size(min=3,max=20, message="il nome deve contenere minimo 3 max 20 caratteri!")
	@Column(nullable = false)
	private String nome;
	
    @NotBlank(message = "Il cognome è obbligatorio!")
    @Size(min=3,max=20, message="il cognome deve contenere minimo 3 max 20 caratteri!")
	@Column(nullable = false)
	private String cognome;
    
    
    @NotBlank(message = "Il CF è obbligatorio!")
	@Pattern(
			regexp = "^(?i)[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$",
			message = "Il codice fiscale inserito non rispetta il formato standard!"
	)
	@Column(name="codice_fiscale", nullable = false, unique = true)
	private String cf;
	
	
    @NotNull(message="La data di nascita è obbligatoria!")
    @Column(name="data_di_nascita", nullable = false)
	@DateTimeFormat(iso=DateTimeFormat.ISO.DATE) // per il binding da form
	private LocalDate dataDiNascita;


	@AssertTrue(message="Devi essere maggiorenne!")
	public boolean isMaggiorenne() {
		if(dataDiNascita == null) return false;
		return Period.between(dataDiNascita, LocalDate.now()).getYears() >= 18;
	}
}
