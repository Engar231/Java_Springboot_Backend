/* DOM = documenti ad oggetti e questi due sotto sono oggetti.
* addEventListener è un controllo di eventi. Il primo paramentro è l'evento in cui scatta. In quewsto caso quando carica tutta la pagina/doc
* secondo paramentro è una funzione a nostra scelta*/
document.addEventListener("DOMContentLoaded", function (){
    alert("Benvenuti nel Compito5_JS (document.addEventListener DOMContentLoaded)");
});

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

function magia6carte(magia) {
    const grigliaImmOld = document.getElementById("originale");
    const grigliaImmNew = document.getElementById("magia");

    if (magia && grigliaImmOld && grigliaImmNew) {
        magia.addEventListener('click', function () {
            // Usiamo il toggle: se c'è d-none lo toglie, se non c'è lo mette.
            // In questo modo eliminiamo la variabile esterna che dava problemi di scope!
            grigliaImmOld.classList.toggle("d-none");
            grigliaImmNew.classList.toggle("d-none");

            console.log("Magia switchata con successo!");
        });
    }
}

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

// UNICO PUNTO DI ACCESSO AL DOM AL CARICAMENTO
document.addEventListener("DOMContentLoaded", function () {
    const magia = document.getElementById("magia6carte");
    const elementos = document.querySelector(".navbar-nav");

    elementi_barra_top(elementos);
    magia6carte(magia);
    footerResize();
    window.addEventListener("resize", footerResize);
});