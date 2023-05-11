const carousel = document.querySelector('#carrousel');
const nextButton = document.querySelector('#next');

nextButton.addEventListener('click', () => {
    carousel.classList.add('slide');
    setTimeout(() => {
        carousel.classList.remove('slide');
        if (carousel.src.includes('leaderBoard')) {
            carousel.src = '../../html/score/achievement.html';
        } else {
            carousel.src = '../../html/score/leaderBoard.html';
        }
    }, 500);
});
