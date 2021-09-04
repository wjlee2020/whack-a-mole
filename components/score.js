import store from "../redux/index.js";
import { addScore } from "../redux/score.js";
import { resetScore } from "../redux/score.js";
import { reloadScore } from "../redux/score.js";

const userScore = document.getElementById('user-score');
const holes = document.querySelectorAll('.hole');
let timer = false;
// come back here to set timer as global variable via redux

export const getPointsPerMole = () => {
    holes.forEach(hole => {
        hole.addEventListener('click', () => {
            if (hole.classList.contains('mole') && timer) {
                store.dispatch(addScore(1));
                let stateScore = store.getState().score;
                userScore.textContent = stateScore
                localStorage.setItem('currentScore', stateScore)
                hole.classList.remove('mole')
            }
        })
    })
}

