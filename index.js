import store from "./redux/index.js";

import { reloadScore } from "./redux/score.js";
import { reloadTimer } from "./redux/timer.js";
import { getPointsPerMole } from "./components/score.js";
import { checkCurrentUserScore } from "./components/score.js";
import { resetGame } from "./components/game-setters.js";
import { moleGameStart } from "./components/game-setters.js";

const boardTime = document.getElementById('game-time');
const startStopBtn = document.getElementById('start-btn');
let playClock = store.getState().time.playClock;


// for creating high scores (potential new feature, if wanted in the future. currently all localStorage gets deleted)
checkCurrentUserScore();
// get your points per each mole clicked
getPointsPerMole()

// on window refresh
window.onload = function () {
    startStopBtn.innerText = 'Start';
    store.dispatch(reloadScore());
    store.dispatch(reloadTimer());
    boardTime.textContent = store.getState().time.playClock;
    if (playClock === 0) {
        resetGame();
    }
}

startStopBtn.addEventListener('click', moleGameStart);