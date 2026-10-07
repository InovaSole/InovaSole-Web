const formular = document.querySelector(".formular-form");

const jmeno_div = document.querySelector(".formular-jmeno");
const jmeno_input = document.querySelector(".formular-jmeno-input");
const jmeno_hlaska = document.querySelector(".formular-jmeno-hlaska");


const email_div = document.querySelector(".formular-email");
const email_input = document.querySelector(".formular-email-input");
const email_hlaska = document.querySelector(".formular-email-hlaska");


const predmet_div = document.querySelector(".formular-predmet");
const predmet_input = document.querySelector(".formular-predmet-input");
const predmet_hlaska = document.querySelector(".formular-predmet-hlaska");


const zprava_div = document.querySelector(".formular-zprava");
const zprava_textarea = document.querySelector(".formular-zprava-textarea");
const zprava_hlaska = document.querySelector(".formular-zprava-hlaska");


const odeslani_hlaska = document.querySelector(".odeslani-hlaska");


// kontrola jména

let validujPriInputu_jmeno = false;
let ValidujPriInputu_email = false;

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

function ValidujEmail() {

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

    const pocet_zavinacu = (email.match(/@/g) || []);
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

    const regex_mistni_cast = /^(?!.*\.\.)[a-zA-Z._+-]+$/

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

    if (ValidujPriInputu_email === true) {
        ValidujEmail();
    }

});

email_input.addEventListener("blur", () => {

    const email_trimmed = email_input.value.trim();

    if (email_trimmed == "") {
        ValidujPriInputu_email = false;
    }
    else {
        ValidujPriInputu_email = true;
    }

    ValidujEmail();

});

email_input.addEventListener("change", () => {

    ValidujEmail();
    
});