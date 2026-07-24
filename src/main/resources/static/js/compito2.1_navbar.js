/* DOM = documenti ad oggetti e questi due sotto sono oggetti.
* addEventListener è un controllo di eventi. Il primo paramentro è l'evento in cui scatta. In quewsto caso quando carica tutta la pagina/doc
* secondo paramentro è una funzione a nostra scelta*/
document.addEventListener("DOMContentLoaded", function (){
    alert("Benvenuti nel Compito2.1_navbaredition (document.addEventListener DOMContentLoaded)");
});

function elementi_barra_top(elementi) {
    if (elementi) {
        const nuovoLi = document.createElement('li');
        nuovoLi.className = "nav-item";

        const nuovaIconaLink = document.createElement('a');
        nuovaIconaLink.className = "nav-link";
        nuovaIconaLink.href = "#";
        nuovaIconaLink.innerHTML = "<img src='img/whatsapp.png' style='width: 30px;' alt='whatsapp'>";

        nuovoLi.appendChild(nuovaIconaLink);
        elementi.appendChild(nuovoLi);
    }
}

function magia6carte(magia) {
    const vecchieCard = document.querySelectorAll(".classic");
    const nuoveCard = document.querySelectorAll(".magia");
    if (magia && vecchieCard.length > 0 && nuoveCard.length > 0) {
        magia.addEventListener('click', function () {
            vecchieCard.forEach(card => {
                card.classList.toggle("d-none");
            });
            nuoveCard.forEach(card => {
                card.classList.toggle("d-none");
            });

            console.log("Magia effettuata con successo su tutte le card!");
        });
    }
}

function footerResize() {
    const barrafondoOld = document.getElementById("always");
    const barrafondoNew = document.getElementById("medio");

    // Verifichiamo che entrambi gli elementi esistano prima di modificarli
    if (!barrafondoOld || !barrafondoNew) return;

    let schermo = window.innerWidth;
    if (schermo >= 768 && schermo <= 991) {
        barrafondoOld.classList.add("d-none");
        barrafondoNew.classList.remove("d-none");
    } else {
        barrafondoNew.classList.add("d-none");
        barrafondoOld.classList.remove("d-none");
    }
}

// UNICO PUNTO DI ACCESSO AL DOM AL CARICAMENTO
document.addEventListener("DOMContentLoaded", function () {
    const magia = document.getElementById("ricerca_magica");
    const elementos = document.querySelector(".navbar-nav");

    elementi_barra_top(elementos);
    magia6carte(magia);
    footerResize();
    window.addEventListener("resize", footerResize);
});
