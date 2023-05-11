function randomTuile() {
    if (!hasEmptytuile()) {
      return;
    }
    let found = false;
    while (!found) {
      let i = Math.floor(Math.random() * lignes);
      let j = Math.floor(Math.random() * colonnes);
      if (grille[i][j] == 0) {
        grille[i][j] = 2;
        let tuile = document.getElementById(i.toString() + "-" + j.toString());
        tuile.innerText = "2";
        tuile.classList.add("score2");
        found = true;
      }
    }
  }