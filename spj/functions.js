const computer = ["Steen", "Papier", "Schaar"]

function sps(speler) {

    let keuze = computer[Math.floor(Math.random() * computer.length)]
    console.log(keuze)

    document.getElementById("comp").innerHTML = keuze

    if (speler == keuze) {

        document.getElementById("result").innerHTML = ("Gelijkspel")
    }

    else if (speler == "Steen" && keuze == "Schaar" || speler == "Papier" && keuze == "Steen" || speler == "Schaar" && keuze == "Papier") {
        document.getElementById("result").innerHTML = ("Gewonnen!")
    }

    else {
        document.getElementById("result").innerHTML = ("Verloren")
    }
 
}
