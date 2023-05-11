window.onload = init;


let grille = generateEmptyGrid();
let difficulty= "";
function init() {
    const buttons = document.querySelectorAll(".difficulty-level-buttons");
    for (let button of buttons) {
        button.addEventListener("click", () => {
            fillGrid(grille, difficulty);
            displayGrid(grille);
            console.log("Sudoku!");
            const tuiles = document.querySelectorAll('.tuile');
            tuiles.forEach(tuile => {
                if (!tuile.classList.contains('tuile-fixe')) {
                    tuile.addEventListener('click', () => handleTuileClick(tuile, grille));
                }
            });
        });
    }
}

function generateEmptyGrid() {
    return Array.from({ length: 9 }, () => new Array(9).fill(0));
}

function fillRandomValues(grille, numbers) {
    let i;
    const validValues = Array.from({ length: 81 }, (_, i) => getValidValues(grille, Math.floor(i / 9), i % 9, numbers));
    const indices = shuffleArray([...Array(81).keys()]);
    for (i = 0; i < 81; i++) {
        const [ligne, colonne] = [Math.floor(indices[i] / 9), indices[i] % 9];
        if (grille[ligne][colonne] === 0) {
            const values = validValues[indices[i]];
            shuffleArray(values);
            for (const value of values) {
                grille[ligne][colonne] = value;
                if (solveGrid(grille)) {
                    break;
                }
                grille[ligne][colonne] = 0;
            }
        }
    }
}

function selectDifficulty() {
    const buttons = document.querySelectorAll('.difficulty-level-buttons');
    console.log(buttons);
    console.log(difficulty);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'facile') {
                console.log("Facile");
                difficulty = "facile";
                removeValues(grille, difficulty);
                fillGrid(grille, difficulty);
            } else if (button.id === 'moyen') {
                console.log("moyen");
                difficulty = "moyen";
                removeValues(grille, difficulty);
                fillGrid(grille, difficulty);
            } else if (button.id === 'difficile') {
                console.log("difficile");
                difficulty = "difficile";
                removeValues(grille, difficulty);
                fillGrid(grille, difficulty);
            }
        });
    });
    console.log(difficulty);
}

selectDifficulty()

function removeValues(grille, difficulty) {
    let count = 0;
    if (difficulty === "facile") {
        count = 30;
    } else if (difficulty === "moyen") {
        count = 40;
    } else if (difficulty === "difficile") {
        count = 50;
    }
    const indices = shuffleArray([...Array(81).keys()]);
    for (let i = 0; i < count; i++) {
        const [ligne, colonne] = [Math.floor(indices[i] / 9), indices[i] % 9];
        const temp = grille[ligne][colonne];
        grille[ligne][colonne] = 0;
        if (!hasUniqueSolution(grille)) {
            grille[ligne][colonne] = temp;
        }
    }
}

function solveGrid(grille, countSolutions = false) {
    let solutions = 0;
    let nonResolvedTuiles = 0;
    const indices = getNextEmptyTuile(grille);
    if (!indices) {
        return 1;
    }
    const [ligne, colonne] = indices;
    const validValues = getValidValues(grille, ligne, colonne);
    for (const value of validValues) {
        grille[ligne][colonne] = value;
        if (countSolutions) {
            solutions += solveGrid(grille, true);
            if (solutions > 1) {
                break;
            }
        } else if (solveGrid(grille)) {
            return true;
        }
        grille[ligne][colonne] = 0;
        nonResolvedTuiles++;
        if (nonResolvedTuiles > 81) {
            return false;
        }
    }
    return countSolutions ? solutions : false;
}


function getNextEmptyTuile(grille) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grille[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

function hasUniqueSolution(grille) {
    const clonedGrille = cloneGrille(grille);
    return solveGrid(clonedGrille, true) === 1;
}


function cloneGrille(grille) {
    return grille.map(row => row.slice());
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function fillGrid(grille, difficulty) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let filled = false;
    while (!filled) {
        generateEmptyGrid(grille);
        fillRandomValues(grille, numbers);
        filled = solveGrid(grille);
    }
    removeValues(grille, difficulty);
}

function displayGrid(grille) {
    const grilleDiv = document.querySelector('#grille');
    grilleDiv.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const tuile = document.createElement('div');
            tuile.classList.add('tuile');
            if (grille[i][j] !== 0) {
                tuile.textContent = grille[i][j];
                tuile.classList.add('tuile-fixe');
            }
            tuile.dataset.ligne = i;
            tuile.dataset.colonne = j;
            grilleDiv.appendChild(tuile);
        }
    }
}

function isValid(grille, ligne, colonne, value) {
    for (let i = 0; i < 9; i++) {
        if (grille[ligne][i] === value && i !== colonne) {
            return false;
        }
    }
    for (let j = 0; j < 9; j++) {
        if (grille[j][colonne] === value && j !== ligne) {
            return false;
        }
    }
    const RegionLigne = Math.floor(ligne / 3) * 3;
    const RegionColonne = Math.floor(colonne / 3) * 3;
    for (let i = RegionLigne; i < RegionLigne + 3; i++) {
        for (let j = RegionColonne; j < RegionColonne + 3; j++) {
            if (grille[i][j] === value && (i !== ligne || j !== colonne)) {
                return false;
            }
        }
    }
    return true;
}

function getValidValues(grille, ligne, colonne) {
    const validValues = [];
    for (let value = 1; value <= 9; value++) {
        if (isValid(grille, ligne, colonne, value)) {
            validValues.push(value);
        }
    }
    return validValues;
}


function isComplete(grille) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!isValid(grille, i, j, grille[i][j])) {
                return false;
            }
        }
    }
    return true;
}

function getTuile(ligne, colonne) {
    return document.querySelector(`[data-ligne="${ligne}"][data-colonne="${colonne}"]`);
}

function getTuilesLigne(ligne) {
    return document.querySelectorAll(`[data-ligne="${ligne}"]`);
}

function getTuilesColonne(colonne) {
    return document.querySelectorAll(`[data-colonne="${colonne}"]`);
}

function getTuilesRegion(ligne, colonne) {
    const RegionLigne = Math.floor(ligne / 3) * 3;
    const RegionColonne = Math.floor(colonne / 3) * 3;
    const tuiles = [];
    for (let i = RegionLigne; i < RegionLigne + 3; i++) {
        for (let j = RegionColonne; j < RegionColonne + 3; j++) {
            tuiles.push(getTuile(i, j));
        }
    }
    return tuiles;
}

function updateGrille(ligne, colonne, value) {
    grille[ligne][colonne] = value;
    calculerScore(grille);
    removeValues(grille, difficulty);
    if (isComplete(grille)) {
        const menu = document.querySelector("#menu");
        if (menu.visibility != "visible") {
            menu.style.visibility = "visible";
        }
    }
}
function calculerScore(grille) {
    let score = 0;
    for (let i = 0; i < 9; i++) {
        if (grille[i].indexOf(0) === -1) {
            score += 100;
        }
        let colonne = [];
        for (let j = 0; j < 9; j++) {
            colonne.push(grille[j][i]);
        }
        if (colonne.indexOf(0) === -1) {
            score += 100;
        }
        let region = [];
        const RegionLigne = Math.floor(i / 3) * 3;
        const RegionColonne = (i % 3) * 3;
        for (let j = RegionLigne; j < RegionLigne + 3; j++) {
            for (let k = RegionColonne; k < RegionColonne + 3; k++) {
                region.push(grille[j][k]);
            }
        }
        if (region.indexOf(0) === -1) {
            score += 300;
        }
    }
    if (checkSudoku(grille))
        document.querySelector("#score").innerText = score;
}

function checkSudoku(grille) {
    for (let i = 0; i < 9; i++) {
        let row = [];
        for (let j = 0; j < 9; j++) {
            row.push(grille[i][j]);
        }
        if (!isValidSudokuSet(row)) {
            return false;
        }
    }
    for (let j = 0; j < 9; j++) {
        let col = [];
        for (let i = 0; i < 9; i++) {
            col.push(grille[i][j]);
        }
        if (!isValidSudokuSet(col)) {
            return false;
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let region = [];
            for (let k = i; k < i + 3; k++) {
                for (let l = j; l < j + 3; l++) {
                    region.push(grille[k][l]);
                }
            }
            if (!isValidSudokuSet(region)) {
                return false;
            }
        }
    }
    return true;
}

function isValidSudokuSet(region) {
    let regionWithoutZeros = region.filter((value) => value !== 0);
    let uniqueValues = new Set(regionWithoutZeros);
    if (uniqueValues.size !== regionWithoutZeros.length) {
        return false;
    }
    for (let i = 0; i < region.length; i++) {
        if (region[i] < 0 || region[i] > 9) {
            return false;
        }
    }
    return true;
}


