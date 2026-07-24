function lampadinaTema() {
    const iconaLuce = document.getElementById("luce");
    if (iconaLuce) {
        iconaLuce.addEventListener("click", function () {
            const LuceFu = document.querySelector("main")
            const icona = iconaLuce.querySelector("i");
            if (icona) {
                // Fa lo switch tra lampadina spenta (tema scuro) e lampadina accesa (tema chiaro)
                icona.classList.toggle("bi-lightbulb-off");
                icona.classList.toggle("bi-lightbulb-fill"); // Icona lampadina piena/accesa
            }
            LuceFu.classList.toggle("tema-chiaro")
        });
    }
}

//Progetto Java, Python, C, Cyber.
function creaListaProgetti(tipoprogetto) {
    // Seleziona il tag <main> dove iniettare le card dei progetti
    const areaPrincipale = document.querySelector("main");

    if (!areaPrincipale) return;//Se il main non esiste, ferma la funzione per evitare errori

    // 1. Svuota il contenuto precedente del main (tranne l'h1) e lo salviamo per non perderlo
    const h1 = areaPrincipale.querySelector("h1");
    areaPrincipale.innerHTML = "";
    areaPrincipale.appendChild(h1);

    // --- CORREZIONE STILE H1 ---
    // Togliamo il posizionamento absolute del CSS per farlo tornare un blocco normale
    h1.style.position = "relative";
    h1.style.top = "0";
    h1.style.left = "0";
    h1.className = "text-nowrap w-100";
    areaPrincipale.className = "col-md-11 d-flex flex-wrap align-items-start"; // Trasforma il main in un contenitore Flexbox per affiancare le card

    const databaseProgetti = [
        {
            titolo: "OCR/Tesseract TCG Artist",
            testo: "Rivela nome artista e tipologia carta caricata",
            tipo: "python",
            immagine: "img/pythonOCR.png",
            link: "https://github.com/Engar231/Bitcamp_Python_OCR_FinalExercise"
        },
        {
            titolo: "Riconoscimento espressioni volto",
            testo: "Rivela espressione tramite mediapipe",
            tipo: "python",
            immagine: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Z7MGtssvO_hiffhYwx5CsZPRVSwC-HgvcFhE4G4MkNR0s62UqpaO-0s&s=10",
            link: "https://github.com/Engar231/Bitcamp_Python_Cifar10_Cifar100_MediapipeFaceReconize_Exercise"
        },
        {
            titolo: "Museo interattivo",
            testo: "Step by Step della creazione di un museo interattivo",
            tipo: "python",
            immagine: "https://plus.unsplash.com/premium_photo-1706548911842-7162d4bd2c98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW50ZXJubyUyMGRlbCUyMG11c2VvfGVufDB8fDB8fHww",
            link: "https://github.com/Engar231/Bitcamp_Python_OOP_Interactive_Museum_Exercise"
        },
        {
            titolo: "Jurassic Park HTML",
            testo: "Creazione di un HTML di base",
            tipo: "java",
            immagine: "img/b1.jpg",
            link: "il_tuo_link_o_file.html"
        }
    ];
// 3. IL FILTRO E LA CREAZIONE DELLE CARD
    databaseProgetti.forEach(function (progetto) {
        // Controlla se il tipo del progetto corrisponde al menu cliccato (es. "python" o "java")
        if (progetto.tipo === tipoprogetto) {
            // Crea il contenitore principale della card
            const scheda = document.createElement("div");
            scheda.className = "card bg-black text-white mx-1 border-secondary overflow-hidden";
            scheda.style.width = "18rem";

            // Se c'è un'immagine nel database, crea il tag <img> e lo inserisce nella card
            if (progetto.immagine) {
                const imgCard = document.createElement("img");
                imgCard.className = "card-img-top";
                imgCard.src = progetto.immagine;
                imgCard.alt = progetto.titolo;
                imgCard.style.height = "100px";
                imgCard.style.objectFit = "cover";
                scheda.appendChild(imgCard);
            }
            // Crea il corpo della card per i testi
            const corpoCard = document.createElement("div");
            corpoCard.className = "card-body";
            // Crea il titolo H5
            const titoloProgetto = document.createElement("h5");
            titoloProgetto.className = "card-title text-danger fw-bold";
            titoloProgetto.innerText = progetto.titolo;
            // Crea il paragrafo della descrizione
            const descrizione = document.createElement("p");
            descrizione.className = "card-text";
            descrizione.innerText = progetto.testo;

            const link = document.createElement("a");
            link.className = "btn btn-danger btn-sm w-100 mt-2";
            link.innerText = "Vedi il progetto";
            link.href = progetto.link;
            link.target = "_blank";

            // Appende tutti i pezzi dentro il corpo della card nell'ordine corretto
            corpoCard.appendChild(titoloProgetto);
            corpoCard.appendChild(descrizione);
            corpoCard.appendChild(link);
            // Mette il corpo dentro la card totale
            scheda.appendChild(corpoCard);
            // Mette la card completata dentro il main della pagina
            areaPrincipale.appendChild(scheda);
        }
    });
}

//Progetto Java, Python, C, Cyber.
function gestisciVisibilitaCarosello(mostra) {
    const carosello = document.querySelector(".carousel");

    if (carosello) {
        if (mostra === false) {
            carosello.classList.add("d-none");
        } else {
            carosello.classList.remove("d-none");
        }
    }
}


// ==========================================
// 6. FUNZIONE GENERAZIONE MINIGIOCO (MGS TORTURE)
// ==========================================
function avviaMinigioco() {
    const areaPrincipale = document.querySelector("main");
    if (!areaPrincipale) return;

    // Svuota il main mantenendo l'H1
    const h1 = areaPrincipale.querySelector("h1");
    areaPrincipale.innerHTML = "";
    areaPrincipale.appendChild(h1);

    // Reset stile H1 per lasciarlo in alto sopra la GIF
    h1.style.position = "relative";
    h1.style.top = "0";
    h1.style.left = "0";
    h1.className = "text-nowrap w-100 mb-2 position-relative text-danger fw-bold px-3";
    h1.style.zIndex = "2";

    // Il main prende lo sfondo della GIF e si allunga a tutto schermo
    areaPrincipale.className = "col-md-11 d-flex flex-column align-items-center justify-content-between mgs-gif-bg min-vh-100 position-relative overflow-hidden";

    // --- NUOVO: SCHERMO STATO AL CENTRO DELLA GIF ---
    const schermoCentrale = document.createElement("div");
    schermoCentrale.id = "schermoTortura";
    schermoCentrale.className = "d-flex flex-column align-items-center justify-content-center text-center rounded p-3";
    // Lo posizioniamo al centro esatto dello schermo sopra la GIF
    schermoCentrale.style.position = "absolute";
    schermoCentrale.style.top = "40%";
    schermoCentrale.style.left = "50%";
    schermoCentrale.style.transform = "translate(-50%, -50%)";
    schermoCentrale.style.zIndex = "2";
    schermoCentrale.style.fontFamily = "'Courier New', monospace";
    schermoCentrale.style.transition = "all 0.05s ease";
    schermoCentrale.style.minWidth = "300px";
    schermoCentrale.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.9)"; // Ombra pesante per leggere i testi sopra la GIF

    schermoCentrale.innerHTML = `
        <div id="snakeStatus" class="fs-1 text-white fw-bold tracking-wide">SNAKE:[ STABILE ]</div>
        <div id="scaricaElettrica" class="fs-4 text-warning fw-bold d-none mt-2" style="letter-spacing: 1px;">⚡ CURRENT OVERLOAD ⚡</div>
    `;
    areaPrincipale.appendChild(schermoCentrale);


    // --- DASHBOARD/HUD BLOCCATA IN BASSO ---
    const gameContainer = document.createElement("div");
    gameContainer.className = "p-3 border-top border-danger bg-black w-100 position-absolute bottom-0 start-0 shadow-lg";
    gameContainer.style.zIndex = "3";
    gameContainer.style.fontFamily = "'Courier New', monospace";
    gameContainer.style.background = "rgba(0, 0, 0, 0.92)";

    // Struttura orizzontale ottimizzata con margini di sicurezza (padding) per i controlli
    gameContainer.innerHTML = `
        <div class="container-fluid px-4"> <!-- Aggiunto un padding laterale di sicurezza -->
            <div class="row align-items-center text-center text-md-start">
                
                <!-- Colonna Info Titolo -->
                <div class="col-md-3 mb-2 mb-md-0">
                    <h6 class="text-danger fw-bold mb-0">OCELOT'S TORTURE PROTOCOL</h6>
                    <p class="text-muted small mb-0" style="font-size: 0.65rem; letter-spacing: 1px;">TACTICAL ESPIONAGE ACTION | BY HIDEO KOJIMA</p>
                </div>

                <!-- Colonna Barra HP e Timer -->
                <div class="col-md-5 mb-2 mb-md-0">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span id="infoRound" class="text-warning fw-bold small">ROUND 1 / 3</span>
                        <span id="timer" class="text-info fw-bold small">TEMPO: 10s</span>
                    </div>
                    <div class="progress bg-dark border border-secondary" style="height: 22px;">
                        <div id="barra" class="progress-bar bg-success d-flex align-items-center justify-content-center" role="progressbar" style="width: 100%; transition: width 0.1s linear;">
                            <span class="fw-bold text-white small" style="font-size: 0.7rem; letter-spacing: 1px;">Healthbar</span>
                        </div>
                    </div>
                </div>

                <!-- Colonna Controlli Spostata leggermente verso il centro (PEZZO CORRETTO) -->
                <div class="col-md-4 text-md-center pe-md-4"> 
                    <div class="mb-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">
                        <span class="text-white-50">MASH <kbd class="bg-danger text-white">[O]</kbd> | RESA <kbd class="bg-secondary text-white">[2x Backspace]</kbd></span>
                    </div>
                    <button id="btnStart" class="btn btn-outline-danger btn-sm w-100 fw-bold py-1">START PROTOCOL</button>
                </div>

            </div>
        </div>
    `;
    areaPrincipale.appendChild(gameContainer);

    // --- LOGICA DEL GIOCO ---
    let vita = 100;
    let tempoRimasto = 10;
    let roundAttuale = 1;
    let timerGioco = null;
    let riduzioneVita = null;
    let giocoAttivo = false;
    let ultimoBackspace = 0;

    const barra = gameContainer.querySelector("#barra");
    const timerTesto = gameContainer.querySelector("#timer");
    const infoRound = gameContainer.querySelector("#infoRound");
    const btnStart = gameContainer.querySelector("#btnStart");

    // Selettori puntati ora sullo schermo centrale fluttuante
    const schermoTortura = areaPrincipale.querySelector("#schermoTortura");
    const snakeStatus = areaPrincipale.querySelector("#snakeStatus");
    const scaricaElettrica = areaPrincipale.querySelector("#scaricaElettrica");

    function avviaDanno() {
        let danno = 3.5 + (roundAttuale * 2);
        riduzioneVita = setInterval(() => {
            if (!giocoAttivo) return;
            vita -= danno;
            aggiornaGrafica();

            if (vita < 40) {
                snakeStatus.innerText = "SNAKE: [ PERICOLO! ]";
                snakeStatus.className = "fs-1 text-danger fw-bold text-uppercase animate-pulse";
            }
            if (vita <= 0) {
                gameOver();
            }
        }, 150);
    }

    function aggiornaGrafica() {
        barra.style.width = vita + "%";
        if (vita > 50) {
            barra.className = "progress-bar bg-success";
        } else if (vita > 25) {
            barra.className = "progress-bar bg-warning";
        } else {
            barra.className = "progress-bar bg-danger";
        }
    }

    function iniziaRound() {
        vita = 100;
        tempoRimasto = 10;
        giocoAttivo = true;
        btnStart.disabled = true;
        btnStart.innerText = "RESISTI...";
        snakeStatus.innerText = "SNAKE: [ COLPITO! ]";
        snakeStatus.className = "fs-1 text-warning fw-bold";
        scaricaElettrica.classList.remove("d-none");
        aggiornaGrafica();

        avviaDanno();

        timerGioco = setInterval(() => {
            tempoRimasto--;
            timerTesto.innerText = `TEMPO: ${tempoRimasto}s`;

            if (tempoRimasto <= 0) {
                clearInterval(timerGioco);
                clearInterval(riduzioneVita);
                superaRound();
            }
        }, 1000);
    }

    const gestisciTastiera = function(e) {
        if (!giocoAttivo) return;

        // Tasto O per il mashing
        if (e.key.toLowerCase() === "o") {
            if(e.repeat) return;
            e.preventDefault();
            vita = Math.min(100, vita + 5.5);
            aggiornaGrafica();

            // Il sussulto rosso ora muove l'intero testo al centro della GIF!
            schermoTortura.style.transform = "translate(calc(-50% + " + (Math.random() > 0.5 ? 8 : -8) + "px), calc(-50% + " + (Math.random() > 0.5 ? 4 : -4) + "px)) scale(1.1)";
            snakeStatus.innerText = "💥 RESISTI! 💥";
            snakeStatus.className = "fs-1 text-danger fw-bold";

            setTimeout(() => {
                if (giocoAttivo) {
                    schermoTortura.style.transform = "translate(-50%, -50%) scale(1)";
                    snakeStatus.innerText = vita < 40 ? "SNAKE: [ PERICOLO! ]" : "SNAKE: [ COLPITO! ]";
                    snakeStatus.className = vita < 40 ? "fs-1 text-danger fw-bold" : "fs-1 text-warning fw-bold";
                }
            }, 35);
            return;
        }

        // Doppio Backspace per la Resa
        if (e.key === "Backspace") {
            e.preventDefault();
            const ora = new Date().getTime();

            if (ora - ultimoBackspace < 500) {
                giocoAttivo = false;
                clearInterval(timerGioco);
                clearInterval(riduzioneVita);
                scaricaElettrica.classList.add("d-none");

                schermoTortura.style.transform = "translate(-50%, -50%)";
                snakeStatus.innerText = "SURRENDER";
                snakeStatus.className = "fs-1 text-muted fw-bold";

                setTimeout(() => {
                    alert("TI SEI ARRESO!\nOcelot: 'Sapevo che avresti ceduto, Snake!'");
                    rimuoviGioco();
                }, 100);
                return;
            }
            ultimoBackspace = ora;
        }
    };

    window.addEventListener("keydown", gestisciTastiera);

    function superaRound() {
        giocoAttivo = false;
        scaricaElettrica.classList.add("d-none");
        snakeStatus.innerText = "SUCCESS";
        snakeStatus.className = "fs-1 text-success fw-bold";

        setTimeout(() => {
            if (roundAttuale < 3) {
                alert(`ROUND ${roundAttuale} SUPERATO.\nPreparati al prossimo voltaggio.`);
                roundAttuale++;
                iniziaRound();
            } else {
                alert("CONGRATULAZIONI!\nHai resistito alla tortura di Ocelot. Sei un vero Soldier.");
                rimuoviGioco();
            }
        }, 500);
    }

    function gameOver() {
        giocoAttivo = false;
        clearInterval(timerGioco);
        clearInterval(riduzioneVita);
        scaricaElettrica.classList.add("d-none");
        snakeStatus.innerText = "SNAKE? SNAAAKE!!!";
        snakeStatus.className = "fs-2 text-danger fw-bold";

        setTimeout(() => {
            alert("GAME OVER.\nHai ceduto alla tortura.");
            rimuoviGioco();
        }, 500);
    }

    function rimuoviGioco() {
        window.removeEventListener("keydown", gestisciTastiera);
        avviaMinigioco();
    }

    btnStart.addEventListener("click", iniziaRound);
}

document.addEventListener("DOMContentLoaded", function () {
    alert("Benvenuti nel Compito6_JS");
    lampadinaTema();
    // Menu Python
    document.querySelector("#projectP a").addEventListener("click", function (e) {
        e.preventDefault();
        const main = document.querySelector("main");
        if(main) main.classList.remove("cyber-room-bg");
        gestisciVisibilitaCarosello(false); //Vogliamo NASCONDERE il carosello
        creaListaProgetti("python");
    });
    // Menu Java
    document.querySelector("#projectJ a").addEventListener("click", function (e) {
        e.preventDefault();
        const main = document.querySelector("main");
        if(main) main.classList.remove("cyber-room-bg");
        gestisciVisibilitaCarosello(false); //Vogliamo NASCONDERE il carosello
        creaListaProgetti("java");
    });

    // --- NUOVO: Ascoltatore Menu Cyber / Secret ---
    const menuCyber = document.querySelector("#projectCyber a");
    if (menuCyber) {
        menuCyber.addEventListener("click", function (e) {
            e.preventDefault();
            gestisciVisibilitaCarosello(false); // Nasconde il carosello
            avviaMinigioco();                  // Avvia il gioco dentro il main
        });
    }
});