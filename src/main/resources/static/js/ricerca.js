
/*@param {string} filterId - ID dell'elemento di input da mostrare/nascondere*/

function toggleFiltro(filterId) {
    const filtro = document.getElementById(filterId);

    if (filtro.style.display === "block") {
        filtro.style.display = "none";
        filtro.value = "";
        applicaFiltriJS();
    } else {
        filtro.style.display = "block";
        filtro.focus();
    }
}

function applicaFiltriJS() {
    const filtroNome = document.getElementById('filter-nome')?.value.toLowerCase().trim() || "";
    const filtroCognome = document.getElementById('filter-cognome')?.value.toLowerCase().trim() || "";
    const filtroCf = document.getElementById('filter-cf')?.value.toLowerCase().trim() || "";
    const filtroUsername = document.getElementById('filter-username')?.value.toLowerCase().trim() || "";
    const filtroEmail = document.getElementById('filter-email')?.value.toLowerCase().trim() || "";
    const filtroRuolo = document.getElementById('filter-ruolo')?.value || "";
    const filtroStipendio = parseFloat(document.getElementById('filter-stipendio')?.value);

    const righe = document.querySelectorAll('.riga-dipendente');

    righe.forEach(riga => {
        const nome = riga.querySelector('.col-nome')?.textContent.toLowerCase() || "";
        const cognome = riga.querySelector('.col-cognome')?.textContent.toLowerCase() || "";
        const cf = riga.querySelector('.col-cf')?.textContent.toLowerCase() || "";
        const username = riga.querySelector('.col-username')?.textContent.toLowerCase() || "";
        const email = riga.querySelector('.col-email')?.textContent.toLowerCase() || "";
        const ruolo = riga.querySelector('.col-ruolo')?.textContent || "";
        const stipendioAttr = riga.querySelector('.col-stipendio')?.getAttribute('data-stipendio');
        const stipendio = parseFloat(stipendioAttr);

        const matchNome = nome.includes(filtroNome);
        const matchCognome = cognome.includes(filtroCognome);
        const matchCf = cf.includes(filtroCf);
        const matchUsername = username.includes(filtroUsername);
        const matchEmail = email.includes(filtroEmail);
        const matchRuolo = (filtroRuolo === "") || (ruolo === filtroRuolo);
        const matchStipendio = isNaN(filtroStipendio) || (stipendio >= filtroStipendio);

        if (matchNome && matchCognome && matchCf && matchUsername && matchEmail && matchRuolo && matchStipendio) {
            riga.style.display = "";
        } else {
            riga.style.display = "none";
        }
    });
}

function resetFiltri() {
    const filtri = document.querySelectorAll('.table-filter');
    filtri.forEach(filtro => {
        filtro.value = '';
        filtro.style.display = 'none';
    });

    const righe = document.querySelectorAll('.riga-dipendente');
    righe.forEach(riga => {
        riga.style.display = "";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formDipendente");

    if (!form) return;

    const inputs = form.querySelectorAll("input, select");

    inputs.forEach(input => {
        input.addEventListener("blur", () => validaCampo(input));
    });

    form.addEventListener("submit", function (e) {
        let tuttoFormValido = true;

        inputs.forEach(input => {
            const campoValido = validaCampo(input);
            if (!campoValido) {
                tuttoFormValido = false;
            }
        });

        if (!tuttoFormValido) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    function validaCampo(input) {
        if (input.type === "hidden" || input.type === "submit" || input.type === "reset") return true;

        const val = input.value.trim();
        let esito = true;
        let messaggioErrore = input.dataset.msgErr || "Campo non valido.";
        let messaggioOK = input.dataset.msgOk || "Campo corretto!";

        if (val === "") {
            esito = false;
            messaggioErrore = "Questo campo è obbligatorio!";
        }
        else if (input.dataset.regex) {
            const regex = new RegExp(input.dataset.regex);
            esito = regex.test(val);
        }
        else if (input.id === "dataDiNascita") {
            const nascita = new Date(val);
            const oggi = new Date();
            let eta = oggi.getFullYear() - nascita.getFullYear();
            const m = oggi.getMonth() - nascita.getMonth();
            if (m < 0 || (m === 0 && oggi.getDate() < nascita.getDate())) eta--;

            if (isNaN(nascita.getTime())) {
                esito = false;
                messaggioErrore = "Data di nascita non valida.";
            } else if (eta < 18) {
                esito = false;
                messaggioErrore = "Devi essere maggiorenne (almeno 18 anni).";
            }
        }
        else if (input.id === "dataDiAssunzione") {
            const dataAssunzione = new Date(val);
            const oggi = new Date();
            oggi.setHours(0, 0, 0, 0);

            if (isNaN(dataAssunzione.getTime())) {
                esito = false;
                messaggioErrore = "Seleziona una data valida.";
            } else if (dataAssunzione < oggi) {
                esito = false;
                messaggioErrore = "La data di assunzione non può essere antecedente ad oggi.";
            }
        }
        else if (input.id === "stipendio") {
            const num = parseFloat(val);
            if (isNaN(num) || num < 1200) {
                esito = false;
                messaggioErrore = "Lo stipendio minimo inseribile è 1200,00 €.";
            }
        }
        else if (input.id === "tipoRuolo") {
            if (val === "") {
                esito = false;
                messaggioErrore = "Seleziona un ruolo aziendale dal menu.";
            }
        }
        else if (input.id === "confermaPassword") {
            const pass = document.getElementById("password") ? document.getElementById("password").value : "";
            if (val !== pass || val === "") {
                esito = false;
                messaggioErrore = "Le password non coincidono.";
            }
        }


        const parent = input.parentElement;
        const validDiv = parent.querySelector(".valid-feedback");
        const invalidDiv = parent.querySelector(".invalid-feedback");

        if (esito) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");

            if (invalidDiv) invalidDiv.style.display = "none";
            if (validDiv) {
                validDiv.textContent = messaggioOK;
                validDiv.style.display = "block";
            }
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");

            if (validDiv) validDiv.style.display = "none";
            if (invalidDiv) {
                invalidDiv.textContent = messaggioErrore;
                invalidDiv.style.display = "block";
            }
        }

        return esito;
    }
});