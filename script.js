/* final version*/

/* Initailisation du timer au milieu*/
let phase_actuelle;
let loc_min_t;
let loc_sec_t;
let loc_sec_p;
let loc_min_p;
let popup = document.getElementById("popup_form");
let param = document.getElementById("parametres");
let close = document.getElementsByClassName("close")[0];

/* Check si il y a des variables déja enregistrées*/

if (localStorage.getItem("minutesTravail") == null) {
    loc_min_t = 25;
} else {
    loc_min_t = localStorage.getItem("minutesTravail");
}


if (localStorage.getItem("secondesTravail") == null) {
    loc_sec_t = "00";
} else {
    loc_sec_t = localStorage.getItem("secondesTravail");
}

if (localStorage.getItem("secondesTravail") == 0) {
    loc_sec_t = "00";
}


if (localStorage.getItem("minutesPause") == null) {
    loc_min_p = 5;
} else {
    loc_min_p = localStorage.getItem("minutesPause");
}


if (localStorage.getItem("secondesPause") == null) {
    loc_sec_p = "00";
} else {
    loc_sec_p = localStorage.getItem("secondesPause");
}

if (localStorage.getItem("secondesPause") == 0) {
    loc_sec_p = "00";
}

/* Affichage du temps à l'initialisation*/

let loc_temps_travail = [loc_min_t, loc_sec_t];
let loc_temps_pause = [loc_min_p, loc_sec_p];
document.getElementById("temps").textContent = loc_temps_travail.join(":")
phase_actuelle = "travail";

/**
 * Enleve une seconde au timer, regarde aussi si on est à la fin d'une phase
 */
function enleverUneSeconde () {
    let tps = document.getElementById('temps');
    if (tps.textContent == "0:00"){
        if (phase_actuelle == "travail") {
            travailToPause();
        } else {
            pauseToTravail();
        }
    }
    let tpsModifie;
    if (tps.textContent.slice(-2) != "00") {
        let h_m = tps.textContent.split(":");
        if (h_m[1] <= 10) {
            if (h_m[1].slice(-1) == 0) {
                let minutes = ['0','9'];
                h_m[1] = minutes.join("");
            } else {
                h_m[1] = h_m[1].slice(-1) - 1;
                let minutes = ['0',h_m[1]];
                h_m[1] = minutes.join("");
            }
        } else {
            h_m[1] = h_m[1] - 1;
        }
        tpsModifie = h_m.join(":");
    } else {
        let h_m = tps.textContent.split(":");
        h_m[0] = h_m[0] - 1;
        h_m[1] = 59;
        tpsModifie = h_m.join(":");
    }
    tps.textContent = tpsModifie;
}


/**
 * Passe de la phase de travail à celle de pause
 */
function travailToPause () {
    var bip = new Audio("https://download.dashmap.live/1de9ad7c-5237-41b5-a9e7-ced0356aa235/32642695_vK227VA.mp3");
    bip.play();
    document.getElementById("temps").textContent = loc_temps_pause.join(":");
    document.getElementById("travail").style.backgroundColor = "#c30010";
    document.getElementById("pause").style.backgroundColor = "#acdf87";
    phase_actuelle = "pause"
}
/**
 * Passe de la phase de pasue à celle de travail
 */
function pauseToTravail () {
    var bip = new Audio("https://download.dashmap.live/1de9ad7c-5237-41b5-a9e7-ced0356aa235/32642695_vK227VA.mp3");
    bip.play();
    document.getElementById("temps").textContent = loc_temps_travail.join(":");
    document.getElementById("travail").style.backgroundColor = "#acdf87";
    document.getElementById("pause").style.backgroundColor = "#c30010";
    phase_actuelle = "travail"
}


let intervalle;
/**
 * Déclenche le timer
 */
function startTimer () {
    let btn = document.getElementById("bouton_start");
    btn.disabled = true;
    document.getElementById("bouton_reset").disabled = false;
    intervalle = setInterval(enleverUneSeconde,1000);
}
/**
 * Réinitialise le timer et remet au début de la phase de travail
 */
function reinitialiser () {
    document.getElementById("temps").textContent = loc_temps_travail.join(":");
    document.getElementById("travail").style.backgroundColor = "#acdf87";
    document.getElementById("pause").style.backgroundColor = "#c30010";
    document.getElementById("bouton_start").disabled = false;
    document.getElementById("bouton_reset").disabled = true;
    phase_actuelle = "travail"
    clearInterval(intervalle);
}
/**
 * Affiche la popup des paramètres
 */
function afficheParametres () {
    popup.style.display = "block";
}
/**
 * Ferme la popup des paramètres quand l'utilisateur clique sur la croix
 */
function fermeParametres () {
    popup.style.display = "none";
}
/**
 * Ferme la popup des paramètres quand l'utilisateur clique à coté
 * @param {} event 
 */
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
/**
 * Vérifie les valeurs que rentre l'utilisateur
 */
function checkInputs () {
    let min_tr = Number(document.getElementById("minutes_travail").value);
    let sec_tr = Number(document.getElementById("secondes_travail").value);
    let min_pa = Number(document.getElementById("minutes_pause").value);
    let sec_pa = Number(document.getElementById("secondes_pause").value);
    let allGood = true;

    if (!Number.isInteger(min_tr)) {
        alert ("Les minutes de travail doivent être entières")
        allGood = false
    }
    if (!Number.isInteger(sec_tr)) {
        alert ("Les secondes de travail doivent être entières")
        allGood = false
    }
    if (!Number.isInteger(min_pa)) {
        alert ("Les minutes de pause doivent être entières")
        allGood = false
    }
    if (!Number.isInteger(sec_pa)) {
        alert ("Les secondes de pause doivent être entières")
        allGood = false
    }

    if (min_tr < 10 || min_tr > 90) {
        allGood = false;
        alert("Les miniutes de travail doivent être comprises entre 10 et 90");
    }
    if (min_pa < 1 || min_pa > 15) {
        allGood = false;
        alert("Les minutes de pause doivent être comprises entre 1 et 15");
    }
    if (sec_tr < 0 || sec_tr > 59) {
        alert("Les secondes de travail doivent être comprises entre 0 et 59");
    }
    if (sec_pa < 0 || sec_tr > 59) {
        alert("Les secondes de pause doivent être comprises entre 0 et 59");
    }

    if (min_tr < min_pa) {
        alert("Vous ne pouvez pas travailler moins que votre tepmps de pause")
        allGood = false
    }

    if (allGood == true) {
        formEnLocalStorage();
    }
}
/**
 * Enregistre les valeurs du formulaire dans le Local Storagele
 */
function formEnLocalStorage() {
    alert ("Parametres sauvgardés !");
    let min_tr = Number(document.getElementById("minutes_travail").value);
    let sec_tr = Number(document.getElementById("secondes_travail").value);
    let min_pa = Number(document.getElementById("minutes_pause").value);
    let sec_pa = Number(document.getElementById("secondes_pause").value);
    localStorage.setItem("minutesTravail", min_tr);
    localStorage.setItem("secondesTravail", sec_tr);
    localStorage.setItem("minutesPause", min_pa);
    localStorage.setItem("secondesPause", sec_pa);
    fermeParametres();
    location.reload();
}