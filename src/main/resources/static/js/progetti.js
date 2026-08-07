let correnteProgettoId = null;
let dipendentiNonAssegnatiGlobal = [];
let paginaCorrente = 0;
const LIMITE_PER_PAGINA = 10;

function getCsrfHeaders() {
    const token = document.querySelector('meta[name="_csrf"]')?.getAttribute('content');
    const header = document.querySelector('meta[name="_csrf_header"]')?.getAttribute('content');

    const headers = {};
    if (token && header) {
        headers[header] = token;
    }
    return headers;
}

// FUNZIONE POP-UP ERRORE NEDRY "PAROLINA MAGICA"
function mostraErroreNedry(messaggioErrore) {
    const gifUrl = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTJrZ3J6NmV3OGd0NmtpdTU3dGltNngwY3lvYWpmOG85NWxzbDhxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QH9uCg7gS6EPm/giphy.gif";

    const overlay = document.createElement("div");
    overlay.id = "magic-word-modal";

    overlay.innerHTML = `
        <div class="nedry-box">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
                <img src="${gifUrl}" alt="Nedry" style="width: 55px; height: auto;">
                <span style="color: #ff3333; font-weight: bold; font-size: 1.1em;">
                    Ah ah ah! Non hai digitato la parolina magica!
                </span>
            </div>
            <div style="background-color: #000; border: 1px dashed #ff3333; padding: 10px; margin-bottom: 20px; color: #ff8888; font-size: 0.9em; text-align: left;">
                > SYSTEM ERROR LOG:<br>
                ${messaggioErrore}
            </div>
            <button onclick="document.getElementById('magic-word-modal').remove()" class="btn-jp-danger">
                CHIUDI TERMINALE
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
}

function apriDettaglioProgetto(progettoId) {
    correnteProgettoId = progettoId;
    paginaCorrente = 0;
    caricaTabelleDipendenti();
}

function caricaTabelleDipendenti() {
    if (!correnteProgettoId) return;

    fetch(`/api/progetti/${correnteProgettoId}/dipendenti-split`)
        .then(res => {
            if (!res.ok) throw new Error("Impossibile recuperare i dati dal server.");
            return res.json();
        })
        .then(data => {
            dipendentiNonAssegnatiGlobal = data.nonAssegnati || [];

            const totalePagine = Math.ceil(dipendentiNonAssegnatiGlobal.length / LIMITE_PER_PAGINA) || 1;
            if (paginaCorrente >= totalePagine) {
                paginaCorrente = Math.max(0, totalePagine - 1);
            }

            const assegnati = data.assegnati || [];

            renderTabellaNonAssegnati();
            renderTabellaAssegnati(assegnati);
            aggiornaBadgeContatore(correnteProgettoId, assegnati.length);
        })
        .catch(err => mostraErroreNedry(err.message));
}

function aggiornaBadgeContatore(progettoId, nuovoTotale) {
    const badgeElement = document.getElementById(`badge-dipendenti-${progettoId}`);
    if (badgeElement) {
        badgeElement.textContent = `${nuovoTotale} Operatori`;
    }
}

function renderTabellaNonAssegnati() {
    const tbody = document.getElementById('tblNonAssegnati');
    if (!tbody) return;

    tbody.innerHTML = '';

    const inizio = paginaCorrente * LIMITE_PER_PAGINA;
    const fine = inizio + LIMITE_PER_PAGINA;
    const dipendentiPagina = dipendentiNonAssegnatiGlobal.slice(inizio, fine);

    if (dipendentiPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-muted text-center">Tutti i dipendenti sono già assegnati!</td></tr>';
    } else {
        dipendentiPagina.forEach(d => {
            const email = d.email ? d.email : 'N/A';
            const cf = d.cf ? d.cf : 'N/A';

            tbody.innerHTML += `
                <tr>
                    <td>${d.nome}</td>
                    <td>${d.cognome}</td>
                    <td>${cf}</td>
                    <td>${email}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-success" style="padding: 3px 10px !important; font-size: 0.8em;" onclick="assegna(${d.id})">+ Aggiungi</button>
                    </td>
                </tr>`;
        });
    }

    aggiornaControlliPaginazione();
}

function renderTabellaAssegnati(lista) {
    const tbody = document.getElementById('tblAssegnati');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!lista || lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-muted text-center">Nessun dipendente assegnato.</td></tr>';
        return;
    }

    lista.forEach(d => {
        const email = d.email ? d.email : 'N/A';
        const cf = d.cf ? d.cf : 'N/A';

        tbody.innerHTML += `
            <tr>
                <td>${d.nome}</td>
                <td>${d.cognome}</td>
                <td>${cf}</td>
                <td>${email}</td>
                <td>
                    <button class="btn btn-sm btn-outline-danger" style="padding: 3px 10px !important; font-size: 0.8em;" onclick="rimuovi(${d.id})">- Togli</button>
                </td>
            </tr>`;
    });
}

function paginaPrecedente() {
    if (paginaCorrente > 0) {
        paginaCorrente--;
        renderTabellaNonAssegnati();
    }
}

function paginaSuccessiva() {
    if ((paginaCorrente + 1) * LIMITE_PER_PAGINA < dipendentiNonAssegnatiGlobal.length) {
        paginaCorrente++;
        renderTabellaNonAssegnati();
    }
}

function aggiornaControlliPaginazione() {
    const btnPrev = document.getElementById("btnPrev");
    const btnNext = document.getElementById("btnNext");
    const infoPagina = document.getElementById("infoPagina");

    const totalePagine = Math.ceil(dipendentiNonAssegnatiGlobal.length / LIMITE_PER_PAGINA) || 1;

    if (btnPrev) btnPrev.disabled = (paginaCorrente === 0);
    if (btnNext) btnNext.disabled = ((paginaCorrente + 1) * LIMITE_PER_PAGINA >= dipendentiNonAssegnatiGlobal.length);
    if (infoPagina) infoPagina.textContent = `Pagina ${paginaCorrente + 1} di ${totalePagine}`;
}

function assegna(dipendenteId) {
    if (!correnteProgettoId) return;

    fetch(`/api/progetti/${correnteProgettoId}/assegna/${dipendenteId}`, {
        method: 'POST',
        headers: getCsrfHeaders()
    })
        .then(async res => {
            if (res.ok) {
                caricaTabelleDipendenti();
            } else {
                const errText = await res.text();
                mostraErroreNedry(errText || "Impossibile assegnare il dipendente al progetto.");
            }
        })
        .catch(error => mostraErroreNedry(error.message));
}

function rimuovi(dipendenteId) {
    if (!correnteProgettoId) return;

    fetch(`/api/progetti/${correnteProgettoId}/rimuovi/${dipendenteId}`, {
        method: 'POST',
        headers: getCsrfHeaders()
    })
        .then(async res => {
            if (res.ok) {
                caricaTabelleDipendenti();
            } else {
                const errText = await res.text();
                mostraErroreNedry(errText || "Impossibile rimuovere il dipendente.");
            }
        })
        .catch(error => mostraErroreNedry(error.message));
}

function eliminaProgetto(id) {
    if (!confirm("Sei sicuro di voler eliminare questo progetto?")) return;

    fetch(`/api/progetti/${id}`, {
        method: 'DELETE',
        headers: getCsrfHeaders()
    })
        .then(async res => {
            if (res.ok) {
                const card = document.getElementById(`card-progetto-${id}`);
                if (card) card.remove();
            } else {
                const msg = await res.text();
                mostraErroreNedry(msg || "Impossibile eliminare il progetto.");
            }
        })
        .catch(error => mostraErroreNedry(error.message));
}