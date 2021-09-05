import store from "./redux/index.js";
import { addScore } from "./redux/score.js";
import { resetScore } from "./redux/score.js";
import { reloadScore } from "./redux/score.js";
import { reloadTimer, setTimer } from "./redux/timer.js";
// import scoreComponent from "./components/score.js";

const boardTime = document.getElementById('game-time');
const userScore = document.getElementById('user-score');
const holes = document.querySelectorAll('.hole');
const startStopBtn = document.getElementById('start-btn');

let timer = store.getState().timer;
let moleMovementTime;
let numOfMoles = 5;


let playClock = 10;
let countFlg = 0;
let moleTime = 1000;


// for creating high scores (potential new feature, if wanted in the future)
const checkCurrentUserScore = () => {
    if (localStorage.getItem('currentScore')) {
        userScore.textContent = localStorage.getItem('currentScore');
    } else {
        userScore.textContent = 0;
    }
}
checkCurrentUserScore();

// get points per mole click via dispatched action (save score to localStorage);
const getPointsPerMole = () => {
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

// move moles to random holes, num of moles based on Math.random with countFlg
const randomMoleHole = () => {
    moleTime = Math.ceil(Math.random() * 3) * 1000;
    if (store.getState().time.timer === false) {
        clearTimeout(moleMovementTime)

    } else {
        setTimeout(randomMoleHole, moleTime)
    }
    holes.forEach(hole => {
        getPointsPerMole();
        if (hole.classList.contains('mole')) {
            hole.classList.remove('mole');
        }
    })
    while (countFlg < numOfMoles) {
        if (countFlg === numOfMoles) {
            numOfMoles = Math.ceil(Math.random() * 5)
        }
        let randHole = holes[Math.floor(Math.random() * 24)];
        randHole.classList.add('mole')
        countFlg++;
    }
    countFlg = 0;


}

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

// countdown the play clock, resetGame when it reaches 0
// const countDownGameClock = () => {
//     playClock--;
//     if (localStorage.getItem('playClock')) {
//         playClock = localStorage.getItem('playClock');
//     } else {

//         localStorage.setItem('playClock', playClock);
//     }
//     boardTime.textContent = playClock;
//     if (playClock === 0) {
//         resetGame();
//     }
// }

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
    boardTime.textContent = store.getState().timer;

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