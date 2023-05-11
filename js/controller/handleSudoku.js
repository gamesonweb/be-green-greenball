

function handleTuileClick(tuile) {
    const ligne = parseInt(tuile.dataset.ligne);
    const colonne = parseInt(tuile.dataset.colonne);
    const tuilesLigne = getTuilesLigne(ligne);
    const tuilesColonne = getTuilesColonne(colonne);
    const tuilesBoite = getTuilesRegion(ligne, colonne);

    tuile.classList.add('tuile-selectionnee');
    tuilesLigne.forEach(t => t.classList.remove('tuile-selectionnee'));
    tuilesColonne.forEach(t => t.classList.remove('tuile-selectionnee'));
    tuilesBoite.forEach(t => t.classList.remove('tuile-selectionnee'));

    const boutons = document.querySelector('#bouttons');
    boutons.innerHTML = "";
    for (let i = 1; i <= 9; i++) {
        const bouton = document.createElement('button');
        bouton.classList.add('bouton-select');
        bouton.textContent = i;
        bouton.addEventListener('click', () => handleBoutonClick(ligne, colonne, i));
        boutons.appendChild(bouton);
    }
}

function handleBoutonClick(ligne, colonne, value) {
    const tuile = getTuile(ligne, colonne);
    tuile.textContent = value;
    updateGrille(ligne, colonne, value);
    const isTuileValid = isValid(grille, ligne, colonne, value);
    if (!isTuileValid) {
        tuile.style.color = "red";
    } else {
        tuile.style.color = "#d2f3fa";
    }

    const tuiles = document.querySelectorAll('.tuile');
    tuiles.forEach(t => t.classList.remove('tuile-selectionnee'));

    if (isComplete(grille)) {
        console.log("Félicitations, vous avez résolu la grille !");
    }
}
