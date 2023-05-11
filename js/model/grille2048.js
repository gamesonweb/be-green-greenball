let grille;
let score = 0;
let lignes = 4;
let colonnes = 4;

window.onload = function () {

  console.log("Page et ressources prêtes à l'emploi");
  // appelée quand la page et ses ressources sont prêtes.
  // On dit aussi que le DOM est ready (en fait un peu plus...)

  const buttons = document.querySelectorAll(".difficulty-level-buttons");
  for (let button of buttons) {
    button.addEventListener("click", () => {

      grille = [[0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      ];

      for (let i = 0; i < lignes; i++) {
        for (let j = 0; j < colonnes; j++) {
          let tuile = document.createElement("div");
          tuile.id = i.toString() + "-" + j.toString();
          let num = grille[i][j];
          updateTuile(tuile, num);
          document.querySelector("#grille").appendChild(tuile);
        }
      }
      randomTuile();
      randomTuile();

    });
  }
}
function updateTuile(tuile, num) {
  tuile.innerText = "";
  tuile.classList.value = "";
  tuile.classList.add("tuile");
  if (num > 0) {
    tuile.innerText = num;
    if (num <= 1024) {
      tuile.classList.add("score" + num.toString());
    } else {
      tuile.classList.add("score2048");
    }
    checkWin();
  }
  let i = 0;
  if (!canMove()) {
    const menu = document.querySelector("#menu");
    if (menu.visibility != "visible") {
      menu.style.visibility = "visible";
    }
  }
}



function filtreZero(ligne) {
  return ligne.filter(num => num != 0);
}

function slide(ligne) {
  ligne = filtreZero(ligne)

  for (let i = 0; i < ligne.length - 1; i++) {
    if (ligne[i] == ligne[i + 1]) {
      ligne[i] *= 2;
      ligne[i + 1] = 0;
      score += 100;
      document.querySelector("#score").innerText = score;
    }
  }

  ligne = filtreZero(ligne)

  while (ligne.length < colonnes) {
    ligne.push(0);
  }
  return ligne;
}

function hasEmptytuile() {
  for (let i = 0; i < lignes; i++) {
    for (let j = 0; j < colonnes; j++) {
      if (grille[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
}

function canMove() {
  if (hasEmptytuile()) {
    return true;
  }
  for (let i = 0; i < lignes; i++) {
    for (let j = 0; j < colonnes - 1; j++) {
      if (grille[i][j] == grille[i][j + 1]) {
        return true;
      }
    }
  }
  for (let j = 0; j < colonnes; j++) {
    for (let i = 0; i < lignes - 1; i++) {
      if (grille[i][j] == grille[i + 1][j]) {
        return true;
      }
    }
  }
  return false;
}

function checkWin() {
  for (let i = 0; i < lignes; i++) {
    for (let j = 0; j < colonnes; j++) {
      if (grille[i][j] === 2048) {
        const menu = document.querySelector("#menu");
        if (menu.visibility != "visible") {
          menu.style.visibility = "visible";
        }
        alert("Félicitations, vous avez gagné !");
        return true;
      }
    }
  }
  return false;
}





