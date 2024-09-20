function enleverUneSeconde () {
    let tps = document.getElementById('temps');
    let tpsModifie;
    if (tps.textContent.slice(-2) != "00") {
        let h_m = tps.textContent.split(":");
        if (h_m[1] <= 10) {
            h_m[1] = "0"+ h_m[1].slice(-1) - 1;
            let minutes = ['0',h_m[1]];
            h_m[1] = minutes.join("");
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

function startTimer () {
    let btn = document.getElementById("bouton_start");
    btn.disabled = true;
    setInterval(enleverUneSeconde,1000);
}