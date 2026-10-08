const formular = document.querySelector(".formular-form");
const desktop_nadpis = document.querySelector(".desktop-nadpis");
const podekovani = document.querySelector(".podekovani-window");

const jmeno_div = document.querySelector(".formular-jmeno");
const jmeno_input = document.querySelector(".formular-jmeno-input");
const jmeno_hlaska = document.querySelector(".formular-jmeno-hlaska");


const email_div = document.querySelector(".formular-email");
const email_input = document.querySelector(".formular-email-input");
const email_hlaska = document.querySelector(".formular-email-hlaska");


const predmet_div = document.querySelector(".formular-predmet");
const predmet_input = document.querySelector(".formular-predmet-input");
const predmet_hlaska = document.querySelector(".formular-predmet-hlaska");
const predmet_finalni = document.getElementById("subject");


const zprava_div = document.querySelector(".formular-zprava");
const zprava_textarea = document.querySelector(".formular-zprava-textarea");
const zprava_hlaska = document.querySelector(".formular-zprava-hlaska");


const odeslani_hlaska = document.querySelector(".odeslani-hlaska");


// KONTROLA POLÍ:
// -------------

let validujPriInputu_jmeno = false;
let validujPriInputu_email = false;
let validujPriInputu_predmet = false;
let validujPriInputu_zprava = false;

function validujJmeno() {

    console.log("vstup do validační funkce");
    
    jmeno_hlaska.textContent = "";
    jmeno_div.classList.remove("valid", "invalid");

    console.log("funkce - po resetování hodnot");

    const jmeno = jmeno_input.value.trim();

    if (jmeno === "") {
        return false;
    }

    if (jmeno.length > 100) {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Jméno je příliš dlouhé";
        return false;
    }

    const povolene_znaky = /^[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáčďéěíňóřšťůúýžÁČĎÉĚÍŇÓŘŠŤŮÚÝŽ -]+$/;
    if (!povolene_znaky.test(jmeno)) {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Jméno obsahuje nepovolené znaky";
        return false;
    }

    console.log("funkce -po regexu");

    if (jmeno.includes("  ")) {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Ve jméně je 2 a více mezer za sebou";
        return false;
    }

    const slova = jmeno.split(" ");
    if (slova.length < 2) {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Jméno je neúplné";
        return false;
    }
    if (slova.length > 4) {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Jméno je má příliš mnoho slov";
        return false;
    }

    console.log("funkce - po kontrole počtu slov");

    const ma_kratke_slovo = slova.some((slovo) => {
        return slovo.length < 2;
    });
    if (ma_kratke_slovo) {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Slovo musí mít alespoň 2 znaky";
        return false;
    }

    console.log("funkce valid");

    jmeno_div.classList.add("valid");
    return true;

}

function validujEmail() {

    email_hlaska.textContent = "";
    email_div.classList.remove("valid", "invalid");

    const email = email_input.value.trim();

    if (email === "") {
        return false;
    }

    if (email.includes(" ")) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Email nesmí obsahovat mezery";
        return false;
    }

    const pocet_zavinacu = (email.match(/@/g) || []).length;
    if (pocet_zavinacu === 0) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Email musí obsahovat zavináč";
        return false;
    } else if (pocet_zavinacu > 1) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Email musí obsahovat pouze 1 zavináč";
        return false;
    }

    if (email.length < 6) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Email je příliš krátký";
        return false;
    }

    if (email.length > 254) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Email je příliš dlouhý";
        return false;
    }

    const dve_pole = email.split("@");

    if (dve_pole.length !== 2) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Email musí obsahovat právě 1 zavináč";
        return false;
    }

    const prvni_hodnota = dve_pole[0].trim();

    if (prvni_hodnota === "") {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Místní část emailu nesmí být prázdná";
        return false;
    }

    if (prvni_hodnota.startsWith(".") || prvni_hodnota.endsWith(".")) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Místní část emailu nesmí začínat ani končit tečkou";
        return false;
    }

    const regex_mistni_cast = /^(?!.*\.\.)[a-zA-Z0-9._+-]+$/

    if (!regex_mistni_cast.test(prvni_hodnota)) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Místní část emailu má nepovolené znaky";
        return false;
    }

    const druha_hodnota = dve_pole[1].trim();

    if (druha_hodnota === "") {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Doména nemůže být prádná";
        return false;
    }

    const regex_domena = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/

    if (!regex_domena.test(druha_hodnota)) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Doména nesplňuje pravidla zápisu";
        return false;
    }

    const tld = druha_hodnota.split(".").pop();
    const tldRegex = /^[a-zA-Z]{2,}$/;

    if (!tldRegex.test(tld)) {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "TLD nesplňuje pravidla zápisu";
        return false;
    }

    email_div.classList.add("valid");
    return true;

}

function validujPredmet() {

    predmet_div.classList.remove("valid", "invalid");
    predmet_hlaska.textContent = "";

    const predmet = predmet_input.value.trim();

    if (predmet === "") {
        return false;
    }

    if (predmet.length < 3) {
        predmet_div.classList.add("invalid");
        predmet_hlaska.textContent = "Předmět je příliš krátký";
        return false;
    }

    if (predmet.length > 120) {
        predmet_div.classList.add("invalid");
        predmet_hlaska.textContent = "Předmět je příliš dlouhý";
        return false;
    }

    predmet_div.classList.add("valid");
    return true;
}

function validujZpravu() {

    zprava_div.classList.remove("valid", "invalid");
    zprava_hlaska.textContent = "";

    const zprava = zprava_textarea.value.trim();

    if (zprava === "") {
        return false;
    }

    if (zprava.length < 15) {
        zprava_div.classList.add("invalid");
        zprava_hlaska.textContent = "Zpráva je příliš krátká";
        return false;
    }

    if (zprava.length > 5000) {
        zprava_div.classList.add("invalid");
        zprava_hlaska.textContent = "Zpráva je příliš dlouhá";
        return false;
    }

    zprava_div.classList.add("valid");
    return true;
}

jmeno_input.addEventListener("input", () => {
    
    console.log("input listener");
    
    if (validujPriInputu_jmeno === true) {
        validujJmeno();
    }

    

});

jmeno_input.addEventListener("blur", () => {

    console.log("blur listener");

    const jmeno_trimmed = jmeno_input.value.trim();

    if (jmeno_trimmed === "") {
        validujPriInputu_jmeno = false;
    }
    else {
        validujPriInputu_jmeno = true;
    }

    validujJmeno();

});

jmeno_input.addEventListener("change", () => {

    console.log("change listener");

    validujJmeno();

});

email_input.addEventListener("input", () => {

    if (validujPriInputu_email === true) {
        validujEmail();
    }

});

email_input.addEventListener("blur", () => {

    const email_trimmed = email_input.value.trim();

    if (email_trimmed === "") {
        validujPriInputu_email = false;
    }
    else {
        validujPriInputu_email = true;
    }

    validujEmail();

});

email_input.addEventListener("change", () => {

    validujEmail();

});

predmet_input.addEventListener("input", () => {

    if (validujPriInputu_predmet === true) {
        validujPredmet();
    }

});

predmet_input.addEventListener("blur", () => {

    const predmet_trimmed = predmet_input.value.trim();

    if (predmet_trimmed === "") {
        validujPriInputu_predmet = false;
    }
    else {
        validujPriInputu_predmet = true;
    }

    validujPredmet();

});

predmet_input.addEventListener("change", () => {

    validujPredmet();

});

zprava_textarea.addEventListener("input", () => {

    if (validujPriInputu_zprava === true) {
        validujZpravu();
    }

});

zprava_textarea.addEventListener("blur", () => {

    const zprava_trimmed = zprava_textarea.value.trim();

    if (zprava_trimmed === "") {
        validujPriInputu_zprava = false;
    }
    else {
        validujPriInputu_zprava = true;
    }

    validujZpravu();

});

zprava_textarea.addEventListener("change", () => {

    validujZpravu();

});



// ODESLÁNÍ FORMULÁŘE:
// ------------------

function zobrazDekovani() {
    formular.style.display = "none";
    desktop_nadpis.style.display = "none";
    podekovani.style.display = "flex";
}

formular.addEventListener("submit", (event) => {

    event.preventDefault();

    let zastavOdeslani = false;

    odeslani_hlaska.textContent = "";
    podekovani.style.display = "none";

    const jmenoValidni = validujJmeno();
    const emailValidni = validujEmail();
    const predmetValidni = validujPredmet();
    const zpravaValidni = validujZpravu();

    if (jmenoValidni === false || emailValidni === false || predmetValidni === false || zpravaValidni === false) {
        zastavOdeslani = true;
    }

    const jmeno = jmeno_input.value.trim();
    const email = email_input.value.trim();
    const predmet = predmet_input.value.trim();
    const zprava = zprava_textarea.value.trim();

    if (jmeno === "") {
        jmeno_div.classList.add("invalid");
        jmeno_hlaska.textContent = "Vyplňte prosím toto pole";
        zastavOdeslani = true;
    }

    if (email === "") {
        email_div.classList.add("invalid");
        email_hlaska.textContent = "Vyplňte prosím toto pole";
        zastavOdeslani = true;
    }

    if (predmet === "") {
        predmet_div.classList.add("invalid");
        predmet_hlaska.textContent = "Vyplňte prosím toto pole";
        zastavOdeslani = true;
    }

    if (zprava === "") {
        zprava_div.classList.add("invalid");
        zprava_hlaska.textContent = "Vyplňte prosím toto pole";
        zastavOdeslani = true;
    }

    if (zastavOdeslani === true) {
        validujPriInputu_jmeno = true;
        validujPriInputu_email = true;
        validujPriInputu_predmet = true;
        validujPriInputu_zprava = true;
        return;
    }

    predmet_finalni.value = `Web - formulář: ${predmet}`;

    const formData = new FormData(formular);

    fetch("https://formsubmit.co/ajax/contact@inovasole.com", {

        method: "POST",

        headers: {
            "Accept": "application/json"
        },
        body: formData
    })

    .then(response => response.json())

    .then(data => {

        console.log("Odpověď ze serveru:", data);

        if (data.success === "true" || data.success === true) {
            zobrazDekovani();
        }
        else {
            odeslani_hlaska.textContent = "Došlo k chybě na straně serveru. Zkuste to prosím později";
        }
    })

    .catch(error => {

        odeslani_hlaska.textContent = "Formulář se nepodařilo odeslat. Zkontrolujte připojení k internetu a zkuste to znovu.";

    });

});