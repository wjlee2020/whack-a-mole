import store from '../redux/index.js';
import { setDefault, setTimer } from '../redux/timer.js';
import { resetScore } from '../redux/score.js';
import { randomMoleHole } from './moles.js';

const userScore = document.getElementById('user-score');
const startStopBtn = document.getElementById('start-btn');
const boardTime = document.getElementById('game-time');

let timer = store.getState().time.timer;
let moleTime = store.getState().time.moleTime;
let moleMovementTime;
let playClock = store.getState().time.playClock;

export const resetGame = () => {
    alert(`Game Over! Your score is ${localStorage.getItem('currentScore') || 0}`)
    // decide to keep high scores or not (this case, clear storage, no high scores)
    localStorage.clear();
    store.dispatch(setDefault())
    store.dispatch(resetScore());
    let stateScore = store.getState().score;
    userScore.textContent = stateScore;
    boardTime.textContent = store.getState().time.playClock;
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

export const moleGameStart = () => {
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