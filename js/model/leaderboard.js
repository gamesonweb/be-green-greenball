function addScore(game, name, score) {
  const nameCell = document.createElement("td");
  const scoreCell = document.createElement("td");
  const row = document.createElement("tr");

  nameCell.textContent = name;
  scoreCell.textContent = score;

  row.appendChild(nameCell);
  row.appendChild(scoreCell);

  let table;
  switch (game.toLowerCase()) {
    case "greenball":
      table = document.querySelector("#green-ball");
      break;
    case "sudoku":
      table = document.querySelector("#sudoku");
      break;
    case "2048":
      table = document.querySelector("#a2048");
      break;
    default:
      console.error(`Le jeu ${game} n'existe pas dans la leaderboard.`);
      return;
  }

  if (table) {
    const tbody = table.querySelector("tbody");
    tbody.appendChild(row);

    // Enregistrer le score dans le local storage
    const scores = JSON.parse(localStorage.getItem(game)) || [];
    scores.push({ name, score });
    localStorage.setItem(game, JSON.stringify(scores));
  } else {
    console.error(`Table ${game} not found in the DOM.`);
  }
}
