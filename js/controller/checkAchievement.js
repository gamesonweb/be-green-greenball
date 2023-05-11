let checkboxes;

document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelectorAll(".difficulty-level-buttons");
  checkboxes = document.querySelectorAll("input[type='checkbox']");
  console.log(checkboxes);

  function saveCheckboxesState() {
    const checkboxValues = [];
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxValues.push(checkboxes[i].checked);
    }
    localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
  }

  function applyCheckboxesState() {
    const savedCheckboxValues = JSON.parse(localStorage.getItem("checkboxValues"));
    if (savedCheckboxValues && savedCheckboxValues.length === checkboxes.length) {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = savedCheckboxValues[i];
      }
    }
  }

  applyCheckboxesState();


  for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
      if (checkWin())
        checkAchievements2048("easy", checkboxes);
      if (isComplete(grille))
        checkAchievementsSudoku("easy", checkboxes);
      saveCheckboxesState();
    });
  }

  fetch('../../html/score/achievement.html')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, 'text/html');
      const achievements = htmlDocument.querySelectorAll('.achievement-checkbox');
      achievements.forEach((achievement, index) => {
        achievement.addEventListener('click', () => {
          checkboxes[index].checked = achievement.checked;
          saveCheckboxesState();
        });
      });
    })
    .catch(error => {
      console.error('Error fetching achievements:', error);
    });
});

function checkAchievements2048(achiv, checkboxes) {
  switch (achiv) {
    case "1024":
      if (checkboxes[0]) checkboxes[0].checked = true;
      break;
    case "2048":
      if (checkboxes[1]) checkboxes[1].checked = true;
      break;
    case "easy":
      if (checkboxes[2]) checkboxes[2].checked = true;
      break;
    case "medium":
      if (checkboxes[3]) checkboxes[3].checked = true;
      break;
    case "hard":
      if (checkboxes[4]) checkboxes[4].checked = true;
      break;
  }
}
function checkAchievementsSudoku(achiv, checkboxes) {
  switch (achiv) {
    case "easy":
      if (checkboxes[5]) checkboxes[5].checked = true;
      break;
    case "medium":
      if (checkboxes[6]) checkboxes[6].checked = true;
      break;
    case "hard":
      if (checkboxes[7]) checkboxes[7].checked = true;
      break;
  }
  if (checkboxes[5] && checkboxes[6] && checkboxes[7] && checkboxes[5].checked && checkboxes[6].checked && checkboxes[7].checked)
    checkboxes[8].checked = true
}

function checkAchievementsGreenBall(achiv, checkboxes) {
  console.log(checkboxes);
  switch (achiv) {
    case "10":
      if (checkboxes[9]) checkboxes[9].checked = true;
      break;
    case "20":
      if (checkboxes[10]) checkboxes[10].checked = true;
      break;
    case "50":
      if (checkboxes[11]) checkboxes[11].checked = true;
      break;
    case "100":
      if (checkboxes[12]) checkboxes[12].checked = true;
      break;
  }
}