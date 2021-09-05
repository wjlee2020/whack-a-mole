import store from "./redux/index.js";

import { resetScore } from "./redux/score.js";
import { reloadScore } from "./redux/score.js";
import { reloadTimer, setTimer } from "./redux/timer.js";
import { getPointsPerMole } from "./components/score.js";
import { checkCurrentUserScore } from "./components/score.js";
import { randomMoleHole } from "./components/moles.js";

const boardTime = document.getElementById('game-time');
const userScore = document.getElementById('user-score');
const startStopBtn = document.getElementById('start-btn');

let timer = store.getState().time.timer;
let moleMovementTime;

let playClock = 10;
let moleTime = 1000;


// for creating high scores (potential new feature, if wanted in the future)
checkCurrentUserScore();
// get your points per each mole clicked
getPointsPerMole()
// move moles to random holes, num of moles based on Math.random with countFlg
randomMoleHole();

// reset all variables related to game;
const resetGame = () => {
    alert(`Game Over! Your score is ${localStorage.getItem('currentScore') || 0}`)
    // decide to keep high scores or not (this case, clear storage, no high scores)
    // timer = false;
    timer = store.dispatch(setTimer())
    localStorage.clear();
    store.dispatch(resetScore());
    let stateScore = store.getState().score;
    userScore.textContent = stateScore;
    moleTime = 1000;
    playClock = 10;
    boardTime.textContent = playClock;
    // clearInterval(gameTime);
    clearTimeout(moleMovementTime);
    startStopBtn.innerText = 'Restart'
}

// countdown game clock which is persisted via localStorage
const countDownPersistence = seconds => {
    seconds = localStorage.getItem('seconds') || seconds;
    function tick() {
        if (store.getState().time.timer === true) {
            seconds--;
            localStorage.setItem('seconds', seconds);
            boardTime.textContent = seconds;
            if (seconds > 0) {
                setTimeout(tick, 1000);
            } if (seconds === 0) {
                resetGame();
            }
        }
    }
    tick();

}

// on window refresh
window.onload = function () {
    startStopBtn.innerText = 'Start';
    store.dispatch(reloadScore());
    store.dispatch(reloadTimer());
    // countDownPersistence(playClock);
    // moleGameStart();
    // playClock = localStorage.getItem('playClock') || 10;
    boardTime.textContent = store.getState().time.playClock;

    if (playClock === 0) {
        resetGame();
    }
}

// game starter (plus pause)
const moleGameStart = () => {
    if (store.getState().time.timer === false) {
        startStopBtn.innerText = 'Stop';
        // timer = true;
        timer = store.dispatch(setTimer())

        moleMovementTime = setTimeout(randomMoleHole, moleTime);
        // gameTime = setInterval(countDownGameClock, 1000);
        countDownPersistence(playClock);
    } else {
        // timer = false;
        timer = store.dispatch(setTimer())
        // clearInterval(gameTime);
        startStopBtn.innerText = 'Start'
    }
}

startStopBtn.addEventListener('click', moleGameStart);