let canvas = document.querySelector("#grille");
let ctx = canvas.getContext("2d");


let lives = 3;
let score = 0;

let x = canvas.width / 2;
let y = canvas.height - 50;
let dx = 4;
let dy = -4;

let forme = 0;
const couleur = ["yellow", "gray", "green"];

let barreWidth = 80;
let barreHeight = 10;
let barreX = (canvas.width - barreWidth) / 2;
let barreY = canvas.height - barreHeight - 20;
let barreAngle = 0;
let barreSlope = 0;

let cible1 = { x: 1, y: 0, couleur: couleur[0], largeur: 60, hauteur: 10, dx: 1 };
let cible2 = { x: 151, y: 0, couleur: couleur[1], largeur: 60, hauteur: 10, dx: 3 };
let cible3 = { x: 301, y: 0, couleur: couleur[2], largeur: 60, hauteur: 10, dx: 2 };

let gaucheAppuye = false;
let droiteAppuye = false;
let qAppuye = false;
let dAppuye = false;

function updateHealth() {
    document.querySelector("#lives").innerHTML = lives + " ♥";
    if (lives === 3) {
        document.querySelector("#lives").style.color = "green";
    } else if (lives === 2) {
        document.querySelector("#lives").style.color = "orange";
    } else if (lives === 1) {
        document.querySelector("#lives").style.color = "red";
    }
}

function updateScore() {
    document.querySelector("#score").innerHTML = score + " points";
}


function drawBall() {
    ctx.beginPath();
    if (forme === 0) {
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x + 10, y + 10);
        ctx.lineTo(x - 10, y + 10);
        ctx.fillStyle = couleur[forme];
        ctx.fill();
    } else if (forme === 1) {
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = couleur[forme];
        ctx.fill();
    } else {
        ctx.rect(x - 10, y - 10, 20, 20);
        ctx.fillStyle = couleur[forme];
        ctx.fill();
    }
    ctx.closePath();
}

function drawBarre() {
    ctx.save();
    ctx.translate(barreX + barreWidth / 2, barreY + barreHeight / 2);
    ctx.rotate(barreAngle * Math.PI / 180);
    ctx.translate(-(barreX + barreWidth / 2), -(barreY + barreHeight / 2));
    ctx.beginPath();
    ctx.rect(barreX, barreY, barreWidth, barreHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    barreSlope = Math.tan(barreAngle * Math.PI / 180);
}

function drawTarget(cible) {
    ctx.beginPath();
    ctx.rect(cible.x, cible.y, cible.largeur, cible.hauteur);
    ctx.fillStyle = cible.couleur;
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    x += dx;
    y += dy;

    if (x + 10 + dx > canvas.width || x - 10 + dx < 0) {
        dx = -dx;
    }
    if (y - 10 + dy < 0) {
        dy = -dy;
    } else if (y + 5 + dy > canvas.height - barreHeight) {
        if (x + 5 > barreX && x < barreX + barreWidth + 5) {
            dy = -dy;
        } else {
            lives--;
            if (lives < 1) {
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 50;
                dx = 4;
                dy = -4;
            }
            if (lives < 0)
                lives = 0;
        }

    } else if (y + 5 + dy > canvas.height - barreHeight) {
        var ballAngle = (x - (barreX + barreWidth / 2)) * barreSlope;
        if (ballAngle < -45) ballAngle = -45;
        if (ballAngle > 45) ballAngle = 45;
        dy = -Math.abs(dy) * Math.cos(ballAngle * Math.PI / 180);
        dx = -Math.abs(dx) * Math.sin(ballAngle * Math.PI / 180);
    }
}
function detectCollisionBalleCible() {
    let cibles = [cible1, cible2, cible3];
    for (let i = 0; i < cibles.length; i++) {
        let cible = cibles[i];
        if (x + 5 >= cible.x && x - 5 <= cible.x + cible.largeur &&
            y + 5 >= cible.y && y - 5 <= cible.y + cible.hauteur) {
            dy = -dy;
            if (forme == 0 && cible1 || forme == 1 && cible2 || forme == 2 && cible3) {
                forme = (forme + 1) % 3;
                score += 10;
            } else { score -= 5; }

            updateScore();
            break;
        }
    }
}

function moveBarre() {
    if (gaucheAppuye && barreX > 0) {
        barreX -= 7;
    }
    if (droiteAppuye && barreX < canvas.width - barreWidth) {
        barreX += 7;
    }
    if (qAppuye && barreAngle > -45) {
        barreAngle -= 5;
    }
    if (dAppuye && barreAngle < 45) {
        barreAngle += 5;
    }
    barreAngle %= 360;
}

function moveTarget1(cible) {
    cible.x += cible.dx;
    if (cible1.x + cible.largeur + cible.dx > 150 || cible1.x + cible.dx < 0) {
        cible.dx = -cible.dx;
    }
}

function moveTarget2(cible) {
    cible.x += cible.dx;
    if (cible2.x + cible.largeur + cible.dx > 300 || cible2.x + cible.dx < 150) {
        cible.dx = -cible.dx;
    }
}

function moveTarget3(cible) {
    cible.x += cible.dx;
    if (cible3.x + cible.largeur + cible.dx > canvas.width || cible3.x + cible.dx < 300) {
        cible.dx = -cible.dx;
    }
}

function checkWinLose() {
    if (score >= 50) {
        document.location.reload();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBarre();
    moveBarre();
    moveBall();

    drawTarget(cible1);
    drawTarget(cible2);
    drawTarget(cible3);

    moveTarget1(cible1);
    moveTarget2(cible2);
    moveTarget3(cible3);
    requestAnimationFrame(draw);
    updateHealth();
    detectCollisionBalleCible()
    checkWinLose()
}

// Écouter les événements clavier
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "ArrowLeft") {
        gaucheAppuye = true;
    } else if (e.key == "ArrowRight") {
        droiteAppuye = true;
    } else if (e.key == "q") {
        qAppuye = true;
    } else if (e.key == "d") {
        dAppuye = true;
    }

}

function keyUpHandler(e) {
    if (e.key == "ArrowLeft") {
        gaucheAppuye = false;
    } else if (e.key == "ArrowRight") {
        droiteAppuye = false;
    } else if (e.key == "q") {
        qAppuye = false;
    } else if (e.key == "d") {
        dAppuye = false;
    }
}

// Démarrer le jeu
const buttons = document.querySelectorAll(".difficulty-level-buttons");
for (let button of buttons) {
    button.addEventListener("click", () => {

        draw();
    });
}