package com.example.demo.controller;

import com.example.demo.entities.*;
import com.example.demo.repositories.IProgettoRepository;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.services.DipendenteService;

import java.security.Principal;


@Controller
public class PageController {
	@Autowired
	private com.example.demo.repository.IPermissionRepository permissionRepo;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private IProgettoRepository progettoRepo;


	private final DipendenteService dipService;

	public PageController(DipendenteService perService)
	{
		this.dipService=perService;
	}


	@GetMapping("/")
	public String root()
	{
		return "redirect:home";
	}


	@GetMapping("/home")
	public String home()
	{
		return "home";
	}


	@GetMapping("/new")
	public String crea(Model model)
	{
		Dipendente d = new Dipendente();
		d.setUser(new User());
		model.addAttribute("d", new Dipendente());
		return "form";
	}


	@PostMapping("/new")
	public String crea(@ModelAttribute("d") Dipendente dipendente) {

		String rawPassword = dipendente.getUser().getPassword();
		dipendente.getUser().setPassword(passwordEncoder.encode(rawPassword));

		PermissionType tipoSelezionato = dipendente.getUser().getPermission().getType();

		Permission permissionEsistente = permissionRepo.findByType(tipoSelezionato)
				.orElseThrow(() -> new RuntimeException("Permesso non trovato nel Database"));

		dipendente.getUser().setPermission(permissionEsistente);


		dipService.inserimentoDipendente(dipendente);

		return "redirect:/login";
	}

	@GetMapping("/gestione")
	public String selezionaTutti(Model model)
	{
		model.addAttribute("items", dipService.selezionaTutti());
		return "gestione";
	}


	//RequestParam
	@GetMapping("/delete")
	public String deleteById(@RequestParam("id") Integer id,Model model)
	{
		dipService.eliminatoID(id);
		model.addAttribute("msg", "La persona è stata Eliminata Correttamente!");
		return "redirect:home";
	}



	@GetMapping("/{id}/edit")
	public String modificaID(Model model, @PathVariable Integer id)
	{
		model.addAttribute("d", dipService.selezionaID(id));
		return "form";
	}

	@PostMapping("/{id}/edit")
	public String modificaP(@ModelAttribute("d") Dipendente d, Model model)
	{
		Dipendente dOld=dipService.selezionaID(d.getId());
		Dipendente dOld2=new Dipendente(dOld.getId(), dOld.getNome(), dOld.getCognome(),dOld.getCf(), dOld.getDataDiNascita(), dOld.getStipendio(), dOld.getDataDiAssunzione(), dOld.getTipoRuolo());
		Dipendente dNew=dipService.modificaD(d);
		if(!dNew.equals(dOld2))
		{
			model.addAttribute("msg", "Modifica Avvenuta! ");
			model.addAttribute("pNew", dNew);
		}else
		{
			model.addAttribute("msg", "Modifica non Avvenuta! ");
		}
		return "home";
	}
	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/admin")
	public String adminDashboard() {

		return "admin_dashboard";
	}



	@GetMapping("/guest")
	public String guestDashboard(Principal principal, Model model) {
		String username = principal.getName();
		Dipendente dipendenteLoggato = dipService.findByUsername(username);

		model.addAttribute("dipendente", dipendenteLoggato);
		return "guest_dashboard";
	}


	@GetMapping("/guest/edit")
	public String editGuestProfile(Principal principal, Model model) {
		String username = principal.getName();
		Dipendente d = dipService.findByUsername(username);

		model.addAttribute("d", d);
		return "form_guest";
	}


	@PostMapping("/guest/edit")
	public String updateGuestProfile(@ModelAttribute("d") Dipendente d) {
		dipService.updateGuestData(d);
		return "redirect:/guest";
	}

	@GetMapping("/default")
	public String defaultAfterLogin(Authentication authentication) {
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(a -> a.getAuthority().equals("ADMIN"));

		if (isAdmin) {
			return "redirect:/admin";
		}
		else {
			return "redirect:/guest";
		}
	}

	@GetMapping("/progetti")
	public String mostraProgetti(Model model) {
		model.addAttribute("progetti", progettoRepo.findAll());
		return "gestione_progetti";
	}

	@GetMapping("/progetti/nuovo")
	public String nuovoProgettoForm(Model model) {
		model.addAttribute("progetto", new Progetto());
		return "form_progetto";
	}


	@GetMapping("/progetti/modifica/{id}")
	public String modificaProgettoForm(@PathVariable Long id, Model model) {
		Progetto progetto = progettoRepo.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("ID Progetto non valido: " + id));
		model.addAttribute("progetto", progetto);
		return "form_progetto";
	}


	@PostMapping("/progetti/salva")
	public String salvaProgetto(@ModelAttribute("progetto") Progetto progetto) {
		progettoRepo.save(progetto);
		return "redirect:/progetti";
	}

	@GetMapping("/guest/progetti")
	public String mostraProgettiGuest(Model model, Principal principal) {
		Dipendente dipendente = dipService.findByUsername(principal.getName());

		model.addAttribute("dipendente", dipendente);
		model.addAttribute("progetti", dipendente.getProgetti());

		return "guest_progetti";
	}
}



