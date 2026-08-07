package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@NotBlank(message = "L'email è obbligatoria!")
	@Pattern(
			regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
			message = "Inserisci un'Email corretta"
	)
	@Email(message = "Inserisci un indirizzo email valido!")
	@Column(nullable = false, unique = true)
	private String email;

	@NotBlank(message = "Lo username è obbligatorio!")
	@Pattern(
			regexp = "^[a-zA-Z0-9_]{4,15}$",
			message = "Lo username deve essere da 4/15 Caratteri"
	)
	@Column(nullable = false, unique = true)
	private String username;

	@NotBlank(message = "La password è obbligatorio!")
	@Pattern(
			regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!._-]).{8,}$",
			message = "La Password deve essere di 8 caratteri minimo, contenere almeno una lettera grande, una piccola, un numero e 2 caratteri speciale!"
	)
	@Column(nullable = false)
	private String password;

	@Transient
	private String confermaPassword;

	@OneToOne(fetch = FetchType.EAGER, mappedBy = "user")
	@EqualsAndHashCode.Exclude
	@ToString.Exclude
	private Dipendente dipendente;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="id_permesso", nullable = false)
	private Permission permission;
}