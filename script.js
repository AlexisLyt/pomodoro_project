function enleverUneSeconde () {
    let tps = document.getElementById('temps');
    if (tps.textContent == "0:00"){
        if (document.getElementById("travail").style.backgroundColor = "#acdf87") {
            travailToPause();
        } else if (document.getElementById("travail").style.backgroundColor = "#c30010") {
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



function travailToPause () {
    var bip = new Audio("https://download.dashmap.live/1de9ad7c-5237-41b5-a9e7-ced0356aa235/32642695_vK227VA.mp3");
    bip.play();
    document.getElementById("temps").textContent = "5:00";
    document.getElementById("travail").style.backgroundColor = "#c30010";
    document.getElementById("pause").style.backgroundColor = "#acdf87";
}

function pauseToTravail () {
    var bip = new Audio("https://download.dashmap.live/1de9ad7c-5237-41b5-a9e7-ced0356aa235/32642695_vK227VA.mp3");
    bip.play();
    document.getElementById("temps").textContent = "25:00";
    document.getElementById("travail").style.backgroundColor = "#acdf87";
    document.getElementById("pause").style.backgroundColor = "#c30010";
}


let intervalle;
function startTimer () {
    let btn = document.getElementById("bouton_start");
    btn.disabled = true;
    document.getElementById("bouton_reset").disabled = false;
    intervalle = setInterval(enleverUneSeconde,1000);
}

function reinitialiser () {
    document.getElementById("temps").textContent = "25:00";
    document.getElementById("travail").style.backgroundColor = "#acdf87";
    document.getElementById("pause").style.backgroundColor = "#c30010";
    document.getElementById("bouton_start").disabled = false;
    clearInterval(intervalle);
}