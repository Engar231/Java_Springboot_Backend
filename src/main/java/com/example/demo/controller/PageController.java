package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.entities.Dipendente;
import com.example.demo.entities.User;
import com.example.demo.services.DipendenteService;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@Controller
public class PageController {


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
		d.setUser(new User()); // Inizializziamo l'oggetto User interno
		model.addAttribute("d", new Dipendente());
		return "form";
	}


	@PostMapping("/new")
	public String crea(@Valid @ModelAttribute("d") Dipendente d,
	                   BindingResult result,
	                   RedirectAttributes redirectAttributes) {

		if (d.getUser() != null && dipService.usernameGiaPresente(d.getUser().getUsername())) {
			result.rejectValue("user.username", "error.user", "Username già in uso!");
		}
		if (d.getUser() != null && dipService.emailGiaPresente(d.getUser().getEmail())) {
			result.rejectValue("user.email", "error.user", "Email già registrata!");
		}
		if (d.getUser() != null && d.getUser().getPassword() != null
				&& !d.getUser().getPassword().equals(d.getUser().getConfermaPassword())) {
			result.rejectValue("user.confermaPassword", "error.user", "Le password inserite non coincidono!");
		}

		if (result.hasErrors()) {
			return "form";
		}

		Dipendente salvato = dipService.inserimentoDipendente(d);
		redirectAttributes.addFlashAttribute("msg", "Registrazione effettuata con successo: ");
		redirectAttributes.addFlashAttribute("dNew", salvato != null ? salvato : d); // Passiamo dNew che serve a navbar.html!

		return "redirect:/home";
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
}



