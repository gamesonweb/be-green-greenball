const form = document.querySelector('form');
if (form !== null) {
  const textInput = document.querySelector('#text-input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let gamePlayed = "2048";
    const name = textInput.value;
    switch (gamePlayed) {  
      case "2048":
        gamePlayed = "2048";
        break;
      case "sudoku":
        gamePlayed = "sudoku";
        break;
      case "greenBall":
        gamePlayed = "greenball"; 
        break;
      default:
        console.error(`Le jeu ${gamePlayed} n'existe pas.`); 
        break;
    }
    addScore(gamePlayed, name, score);
    console.log(gamePlayed)
    console.log(name)
    console.log(score)
  
    alert('Votre score a été enregistré !'); 
  });
} else {
  console.error("The form element was not found in the HTML document.");
}
