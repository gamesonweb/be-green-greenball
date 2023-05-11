class Chrono {
    constructor(time) {
        this.time = time;
        this.timerId = null;
    }

    startTimer(onTimerEnd) {
        const timerDisplay = document.querySelector("#timer-display");
        this.timerId = setInterval(() => {
            this.time--;
            timerDisplay.innerHTML = `Temps restant : ${this.time}`;
            if (this.time <= 0) {
                clearInterval(this.timerId);
                onTimerEnd();
            }

            if (this.time == 0) {
                const grille = document.querySelector("#grille");
                grille.setAttribute("tabindex", "-1");
            }
        }, 1000);
    }

    openMenu() {
        const menu = document.querySelector("#menu");
        if (menu.visibility != "visible") {
            menu.style.visibility = "visible";  
            alert("Temps écoulé ! Vous avez perdu !");
        }
    }
}

console.log("Chrono loaded");
const easyTimer = new Chrono(600);
const mediumTimer = new Chrono(300);
const hardTimer = new Chrono(180);

const button = document.querySelectorAll(".difficulty-level-buttons");
let timerRunning = false;
button[0].addEventListener("click", () => {
    if (!timerRunning) {
        timerRunning = true;
        button[0].disabled = true;
        button[1].disabled = true;
        button[2].disabled = true;
        document.querySelector("#menu").style.visibility = "hidden";
        easyTimer.time = 600;
        easyTimer.startTimer(() => {
            timerRunning = false;
            easyTimer.openMenu();
            button[0].disabled = false;
            button[1].disabled = false;
            button[2].disabled = false;
        });
        alert("Nouvelle partie en facile !");
    }
});

button[1].addEventListener("click", () => {
    if (!timerRunning) {
        timerRunning = true;
        button[0].disabled = true;
        button[1].disabled = true;
        button[2].disabled = true;
        document.querySelector("#menu").style.visibility = "hidden";
        mediumTimer.time = 300;
        mediumTimer.startTimer(() => {
            timerRunning = false;
            mediumTimer.openMenu();
            button[0].disabled = false;
            button[1].disabled = false;
            button[2].disabled = false;
        });
        alert("Nouvelle partie en moyen !");
    }
});

button[2].addEventListener("click", () => {
    if (!timerRunning) {
        timerRunning = true;
        button[0].disabled = true;
        button[1].disabled = true;
        button[2].disabled = true;
        document.querySelector("#menu").style.visibility = "hidden";
        hardTimer.time = 5;
        hardTimer.startTimer(() => {
            timerRunning = false;
            hardTimer.openMenu();
            button[0].disabled = false;
            button[1].disabled = false;
            button[2].disabled = false;
        });
        alert("Nouvelle partie en difficile !");
    }
});

    