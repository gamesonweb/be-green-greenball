document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
      moveLeft();
      randomTuile();
    }
    else if (e.code == "ArrowRight") {
      moveRight();
      randomTuile();
    }
    else if (e.code == "ArrowUp") {
      moveUp();
      randomTuile();
    }
    else if (e.code == "ArrowDown") {
      moveDown();
      randomTuile();
    }
  })


  
function moveLeft() {
    for (let i = 0; i < lignes; i++) {
      let ligne = grille[i];
      let nouvelleLigne = slide(ligne);
      grille[i] = nouvelleLigne;
  
      for (let j = 0; j < colonnes; j++) {
        let tuile = document.getElementById(i.toString() + "-" + j.toString());
        let num = grille[i][j];
        updateTuile(tuile, num);
      }
    }
  }
  
  function moveRight() {
    for (let i = 0; i < lignes; i++) {
      let ligne = grille[i].slice().reverse();
      let nouvelleLigne = slide(ligne).reverse();
      grille[i] = nouvelleLigne;
  
      for (let j = 0; j < colonnes; j++) {
        let tuile = document.getElementById(i.toString() + "-" + j.toString());
        let num = grille[i][j];
        updateTuile(tuile, num);
      }
    }
  }
  
  function moveUp() {
    for (let j = 0; j < colonnes; j++) {
      let colonne = [];
      for (let i = 0; i < lignes; i++) {
        colonne.push(grille[i][j]);
      }
      let nouvelleColonne = slide(colonne);
      for (let i = 0; i < lignes; i++) {
        grille[i][j] = nouvelleColonne[i];
        let tuile = document.getElementById(i.toString() + "-" + j.toString());
        let num = grille[i][j];
        updateTuile(tuile, num);
      }
    }
  }
  
  function moveDown() {
    for (let j = 0; j < colonnes; j++) {
      let colonne = [];
      for (let i = 0; i < lignes; i++) {
        colonne.push(grille[i][j]);
      }
      let nouvelleColonne = slide(colonne.reverse()).reverse();
      for (let i = 0; i < lignes; i++) {
        grille[i][j] = nouvelleColonne[i];
        let tuile = document.getElementById(i.toString() + "-" + j.toString());
        let num = grille[i][j];
        updateTuile(tuile, num);
      }
    }
  }
  