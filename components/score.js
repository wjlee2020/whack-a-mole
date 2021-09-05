import store from "../redux/index.js";
import { addScore } from "../redux/score.js";

const userScore = document.getElementById('user-score');
const holes = document.querySelectorAll('.hole');

export const getPointsPerMole = () => {
    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole.classList.contains('mole') && store.getState().time.timer) {
                store.dispatch(addScore(1));
                let stateScore = store.getState().score;
                userScore.textContent = stateScore
                localStorage.setItem('currentScore', stateScore)
                hole.classList.remove('mole')
            }
        })
    })
}

export const checkCurrentUserScore = () => {
    if (localStorage.getItem('currentScore')) {
        userScore.textContent = localStorage.getItem('currentScore');
    } else {
        userScore.textContent = 0;
    }
}