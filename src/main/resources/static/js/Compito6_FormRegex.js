document.addEventListener("DOMContentLoaded", function (){
    //Debug per vedere se prende il file e le varie funzioni
    alert("Benvenuti nel Compito6_FormRegex (document.addEventListener DOMContentLoaded)");
    console.log(d, "- Check se parte sin da subito in che formato")
    initComuni()
    console.log(lista_api, "- Check se parte sin da subito in che formato")
});

//costanti e variabili usate
//check per vedere il formato della data
const d = new Date();
d.toDateString();
let lista_api = [];
const nome = document.reg.nome;
const cognome = document.reg.cognome;
const cf = document.reg.cf;
const username = document.reg.username;
const comune = document.reg.comune;
const email = document.reg.email;
const password = document.reg.password;
const date = document.reg.dataNascita;
const sesso = document.reg.sesso;
const passwordcheck = document.reg.passwordcheck;
const btnOcchioPass = document.getElementById('psw');
const btnCheckPass = document.getElementById('pswcheck');
const btnGenera=document.getElementById('genera');
const btninvia = document.getElementById('invio');

btninvia.addEventListener('click', function(e){
    let formValido = true;

    if(!controlloNome(nome)) formValido = false;
    if(!controlloCognome(cognome)) formValido = false;
    if(!controlloCF(cf)) formValido = false;
    if(!controlloUsername(username)) formValido = false;
    if(!controlloEmail(email)) formValido = false;
    if(!controlloPassword(password)) formValido = false;
    if(!controlloData(date)) formValido = false;
    if(!controlloPasswordCheck(passwordcheck)) formValido = false;

    if (!formValido) {
        e.preventDefault();
    }
});


//Blur è una funzione che permette di cambiare la schermata in modo celato. Serve per i V o X.
nome.addEventListener('blur', function(){
    controlloNome(nome);
});
cognome.addEventListener('blur', function(){
    controlloNome(cognome);
});
cf.addEventListener('blur', function(){
    controlloCF(cf);
})
username.addEventListener('blur', function(){
    controlloUsername(username);
});
email.addEventListener('blur', function(){
    controlloEmail(email);
});
password.addEventListener('blur', function(){
    controlloPassword(password);
});
date.addEventListener('blur', function(){
    controlloData(date);
});
passwordcheck.addEventListener('blur', function(){
    controlloPasswordCheck(passwordcheck);
});

//FUNZIONE CHECK NOME REGEX
function controlloNome(nome) {
    //Regex controlla che la lunghezza totale sia tra 3 e 20 caratteri
    let regola = new RegExp( "^(?=.{3,20}$)[A-Za-zÀ-ù]+( [A-Za-zÀ-ù]+)*$");

    if (!regola.test(nome.value)){
        nome.classList.add('is-invalid');
        nome.classList.remove('is-valid');
        return false;
    }
    else {
        nome.classList.remove('is-invalid');
        nome.classList.add('is-valid');
        return true;
    }
}
//FUNZIONE CHECK COGNOME REGEX
function controlloCognome(cognome) {
    //Regex controlla che la lunghezza totale sia tra 3 e 20 caratteri
    let regola = new RegExp( "^(?=.{3,20}$)[A-Za-zÀ-ù]+( [A-Za-zÀ-ù]+)*$", 'i');

    if (!regola.test(cognome.value)){
        cognome.classList.add('is-invalid');
        cognome.classList.remove('is-valid');
        return false;
    }
    else {
        cognome.classList.remove('is-invalid');
        cognome.classList.add('is-valid');
        return true;
    }
}
//FUNZIONE CHECK CF REGEX
function controlloCF(cf) {
    //Regex controlla che la lunghezza totale sia tra 3 e 20 caratteri
    let regola = new RegExp( "^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$", 'i');

    if (!regola.test(cf.value)){
        cf.classList.add('is-invalid');
        cf.classList.remove('is-valid');
        return false;
    }
    //Ricopiato parte del valore del genera per il controllo, da migliorare.
    const mesiCF = {
        "01": "A", "02": "B", "03": "C", "04": "D", "05": "E", "06": "H",
        "07": "L", "08": "M", "09": "P", "10": "R", "11": "S", "12": "T"
    };
    const cons = /[bcdfghjklmnpqrstvwxyz]/gi;
    const voc = /[aeiouàèìòù]/gi;

    let consonantiTrovateCognome = cognome.value.match(cons) || [];
    let vocaliTrovateCognome = cognome.value.match(voc) || [];
    let lettereUnite = consonantiTrovateCognome.concat(vocaliTrovateCognome);
    let codiceCognome = lettereUnite.slice(0, 3).join("").toUpperCase();
    let consonantiTrovateNome = nome.value.match(cons) || [];
    let vocaliTrovateNome = nome.value.match(voc) || [];
    let codiceNome = "";
    if (consonantiTrovateNome.length >= 4) {
        codiceNome = (consonantiTrovateNome[0] + consonantiTrovateNome[2] + consonantiTrovateNome[3]).toUpperCase();
    } else {
        let lettereUniteNome = consonantiTrovateNome.concat(vocaliTrovateNome);
        codiceNome = lettereUniteNome.slice(0, 3).join("").toUpperCase();
    }

    if (!date.value) return false;
    let data = date.value.split("-");
    let anno = data[0].slice(-2);
    let mese = data[1];
    let letteraMese = mesiCF[mese];
    let g = data[2];
    if (sesso.value === "F") {
        g = parseInt(g) + 40;
    }
    let giorno = g.toString().padStart(2, '0');
    let comuneTrovato = lista_api.find(c => c.nome.toLowerCase() === comune.value.trim().toLowerCase());
    let codCatasto = comuneTrovato ? comuneTrovato.codice_catastale : "";
    let codice15Generato = (codiceCognome + codiceNome + anno + letteraMese + giorno + codCatasto).toUpperCase();
    let codice15Utente = cf.value.trim().substring(0, 15).toUpperCase();
    if (codice15Utente !== codice15Generato) {
        cf.classList.add('is-invalid');
        cf.classList.remove('is-valid');
        return false;
    } else {
        cf.classList.remove('is-invalid');
        cf.classList.add('is-valid');
        return true;
    }
}
//FUNZIONE CHECK USERNAME REGEX
function controlloUsername(username) {
    //Usiamo // per velocizzare
    //(?=.*[A-Z]) almeno una maiscuola (?=.*[a-z]) almeno uno minuscola (?=(?:.*[0-9]){2,} almeno 2 numeri (?=(?:.*[!@#$%^&*(),.?":{}|<>_+-]){2,}) almeno 2 speciali
    let regola = new RegExp( /^(?=.*[A-Z])(?=.*[a-z])(?=(?:.*[0-9]){2,})(?=(?:.*[!@#$%^&*(),.?":{}|<>_+-]){2,}).{8,10}$/);

    if (!regola.test(username.value)){
        username.classList.add('is-invalid');
        username.classList.remove('is-valid');
        return false;
    }
    else {
        username.classList.remove('is-invalid');
        username.classList.add('is-valid');
        return true;
    }
}
//FUNZIONE CHECK EMAIL REGEX
function controlloEmail(email) {
    //Regex controlla che la lunghezza totale sia tra 3 e 20 caratteri
    let regola = new RegExp( "^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$", 'i');

    if (!regola.test(email.value)){
        email.classList.add('is-invalid');
        email.classList.remove('is-valid');
        return false;
    }
    else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
        return true;
    }
}
//FUNZIONE CHECK PASSWORD REGEX
function controlloPassword(password) {
    let regola = new RegExp( /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_+-]).{8,10}$/, 'i');

    if (!regola.test(password.value)){
        password.classList.add('is-invalid');
        password.classList.remove('is-valid');
        return false;
    }
    else {
        password.classList.remove('is-invalid');
        password.classList.add('is-valid');
        return true;
    }
}

//FUNZIONE CHECK DATA MAGGIORENNE
function controlloData(dataInput) {
    if (!dataInput.value) {
        dataInput.classList.add('is-invalid');
        dataInput.classList.remove('is-valid');
        return false;
    }
    let dataInserita = new Date(dataInput.value);
    let oggi = new Date();
    let eta = oggi.getFullYear() - dataInserita.getFullYear();
    let mese = oggi.getMonth() - dataInserita.getMonth();
    if (mese < 0 || (mese === 0 && oggi.getDate() < dataInserita.getDate())) {
        eta--;
    }
    if (eta >= 18) {
        dataInput.classList.remove('is-invalid');
        dataInput.classList.add('is-valid');
        dataInput.innerText = "Utente Maggiorenne"
        return true;
    } else {
        dataInput.classList.add('is-invalid');
        dataInput.classList.remove('is-valid');
        dataInput.innerText = "Utente non maggiorenne"
        return false;
    }
}
//FUNZIONE CHECK PASSWORD
function controlloPasswordCheck(passwordCheckInput) {
    //A differenza delle altre qui dobbiamo solo controllare che sia uguale.
    if (passwordCheckInput.value === "" || passwordCheckInput.value !== password) {
        passwordCheckInput.classList.add('is-invalid');
        passwordCheckInput.classList.remove('is-valid');
        return false;
    } else {
        passwordCheckInput.classList.remove('is-invalid');
        passwordCheckInput.classList.add('is-valid');
        return true;
    }
}

//FUNZIONE BOTTONE OCCHIO PASSWORD
btnOcchioPass.addEventListener('click', function() {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
});

//FUNZIONE BOTTONE OCCHIO PASSWORDCHECK
btnCheckPass.addEventListener('click', function() {

    if (passwordcheck.type === "password") {
        passwordcheck.type = "text";
    } else {
        passwordcheck.type = "password";
    }
});

//FUNZIONE CHIAMATA ASYNCRONA API. PREPARAZIONE
async function initComuni(){
    //la nostra API temporeanea di Mocki
    const URL_DATI="https://mocki.io/v1/a7fd0340-8dcd-4663-8875-7abc5bc8126a";
    const datalist=document.querySelector("#listacomuni");
    //interroghiamo l'API. La fetch vuole l'URL e cosi facciamo richiesta asincrona
    const response = await fetch(URL_DATI); //ci da una promise, che è un oggetto, che contiene uno scatolo che verrà consegnato se tutto va bene
    //però bisogna gestirla in modo adeguata, un'attesa , onde evitare eccezioni si usa un'attesa implicita con await
    //response è la promise. In pratica ci da tutto il contenitore. Possiamo chiamarla anche cacca, sempre response è.
    //l'attesa può essere esplcitia e implicita. Con Threads è implicita, con l'attesa await fino a quando non la recupera noi attendiamo.
    if(!response){
        throw new Error("Errore caricamento dati.");
    }
    const dati=await response.json();
    lista_api=dati.comuni;
    console.log(lista_api, "- Check se parte sin da subito in che formato dentro dentro API FUORI FETCH")

    dati.comuni.forEach(
        comune => {
            const option = document.createElement('option');
            option.value = comune.nome;
            datalist.appendChild(option);
        } //arrow function, usa e getta.
    )
    console.log(lista_api, "- Check se parte sin da subito in che formato dentro API")
}

//FUNZIONE BOTTONE GENERA
btnGenera.addEventListener('click', function() {
    //check log dei dati che prende, per vedere se l'HTML sia scritto correttamente
    console.log(nome.value, cognome.value,comune.value, date.value, sesso.value);
    //per il CF va inserita la lettera, quindi già impostato la sequenza.
    const mesiCF = {
        "01": "A", "02": "B", "03": "C", "04": "D", "05": "E", "06": "H",
        "07": "L", "08": "M", "09": "P", "10": "R", "11": "S", "12": "T"
    };
    //regex per vocali e consonanti /gi prende tutte le lettere , non solo la prima, i per il case sensitive
    const cons = new RegExp(/[bcdfghjklmnpqrstvwxyz]/gi)
    const voc = new RegExp(/[aeiou]/gi)
    //Dichiarato codice nome per evitare confilitti più avanti.
    let codiceNome;
    //Q1 - Cognome (primi 3 caratteri): Si prendono le prime 3 consonanti del cognome.
    //Se non bastano, si attinge dalle vocali.
    //Se il cognome ha meno di 3 lettere, si completa con la lettera X.
    //A1 - Qui parte il controllo del match vocali, in caso negativa, ritorna un array vuoto.
    let consonantiTrovateCognome = cognome.value.match(cons) || [];
    let vocaliTrovateCognome = cognome.value.match(voc) || [];
    //A1 - Qui uniamo le consonanti e vocali trovate in un unico Array
    let lettereUnite = consonantiTrovateCognome.concat(vocaliTrovateCognome);
    //A1 Qui tagliamo l'intero Array dove prendiamo dal valore 1 fino al massimo di 3
    let codiceCognome = lettereUnite.slice(0, 3).join("").toUpperCase();
    console.log(codiceCognome); //Check se la funzione è andata a buon fine
    //Q2 -Nome (3 caratteri successivi): Si applica una regola simile.
    //Si prendono la prima, la terza e la quarta consonante del nome.
    //Se non è possibile, si segue un ordine preciso per includere anche le vocali.
    //A2 - Stessa cosa del cognome
    let consonantiTrovateNome = nome.value.match(cons) || [];
    let vocaliTrovateNome = nome.value.match(voc) || [];
    //A2 - Se le consonanti trovate sono 4 allora entra nell'IF e, usando la variabile dichirata sopra, ci ridà il valore
    if (consonantiTrovateNome.length >= 4)
    {
        codiceNome = (consonantiTrovateNome[0] + consonantiTrovateNome[2] + consonantiTrovateNome[3]).toUpperCase();
        console.log(codiceNome);
    }
    //A2- Sennò prenderà le vocali
    else {
        let lettereUniteNome = consonantiTrovateNome.concat(vocaliTrovateNome);
        codiceNome = lettereUniteNome.slice(0, 3).join("").toUpperCase();
        console.log(codiceNome);
    }
    //Q3 - Data di Nascita e Sesso (5 caratteri): Le ultime due cifre dell’anno di nascita (es. “90” per 1990).
    //Una lettera per il mese (A = Gennaio, B = Febbraio, C = Marzo, ecc.).
    //Il giorno di nascita. Per le donne, a questo numero viene sommato 40 (es. una donna nata il 15 del mese avrà “55”).
    //A3 - prendiamo la data, togliamo i trattini per trasformare data in array tramite split
    let data = date.value.split("-")
    let anno = data[0] //Array 1
    let mese = data[1] //Array 2
    //A3 - Il mese deve prendere la lista fatta sopra per darci il valore corrispondente al mese
    let letteraMese = mesiCF[mese];
    console.log(anno.slice(-2)) //prende le ultime due dell'array dell'anno
    console.log(letteraMese) //Check per vedere se và.
    let giorno = data[2] //array 3
    //A3 - Se è donna deve fare la somma con +40
    if(sesso.value==="F"){
        giorno = parseInt(giorno) + 40;
        console.log(giorno);
    }
    else {
        console.log(giorno)
    }
    //Q4 - Comune o Stato Estero di Nascita (4 caratteri): È il cosiddetto “codice catastale”,
    //un codice alfanumerico che identifica in modo univoco ogni comune italiano
    // (es. H501 per Roma, F205 per Milano).
    //A4 - Richiesto aiuto per capire come fare con un API.
    //Prendiamo la lista attraverso una variabile messa sopra per identificare il comune
    let comuneTrovato = lista_api.find(c => c.nome.toLowerCase() === comune.value.toLowerCase());

    let codCatasto = "";
    if (comuneTrovato) {
        codCatasto = comuneTrovato.codice_catastale;
    } else {
        console.log("Comune non trovato!");
    }

    console.log("Codice Catastale:", codCatasto);
    //Q5- Carattere di Controllo (ultimo carattere):
    //È una lettera ottenuta tramite un complesso algoritmo che valida la correttezza
    //di tutti i 15 caratteri precedenti.
    //A5 - Prendiamo l'algoritmo su Internet delle varie conversioni
    const lettere_D = {
        '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
        'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
        'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
        'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
    };

    const lettere_P = {
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
        'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
        'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
    };
    //A5 - Prendiamo tutte le lettere in un'unica lista
    const lettere_CF = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    //A5 - Uniamo tutto ciò che abbiamo fatto prima, codiceNome ci serviva come variabile singola proprio per poterla richiamare qua con facilità
    let CF15 = (codiceCognome + codiceNome + anno.slice(-2) + letteraMese + giorno + codCatasto).toUpperCase();
    let check_somma = 0;
    //A5 - Dichiariamo una variabile Somma per tenere dentro tutti i counter dei valori ed iteriamo la lista
    for (let i = 0; i < CF15.length; i++) {
        let carattere = CF15[i];
    //A5 - Pari o Dispari
        if ((i + 1) % 2 === 0) {
            check_somma += lettere_P[carattere];
        } else {
            check_somma += lettere_D[carattere];
        }
    }
    //A5 - Ci prendiamo il valore della somma dei numeri diviso il valore richiesto per l'algoritmo del CF, il resto da l'indice.
    let resto = check_somma % 26;
    //A5 - Diamo una variabile per inserire il valore e poterla richiamare.
    let lettera_Check = lettere_CF[resto];

    console.log(lettera_Check); //Check log per vedere se funziona
    //A5 - Uniamo il vecchio codice + il carattere trovato essendo string di mettera all'ultimo
    let cf_Completo = CF15 + lettera_Check;

    cf.value = cf_Completo;
    //A5 - Forziamo il valore verde alla pressione del click sennò da errore col BLUR
    cf.classList.remove('is-invalid');
    cf.classList.add('is-valid');
})