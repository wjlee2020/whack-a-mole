import store from "./redux/index.js";
import { addScore } from "./redux/score.js";

const boardTime = document.getElementById('game-time');
const userScore = document.getElementById('user-score');
const holes = document.querySelectorAll('.hole');
const mole = document.querySelector('.mole');
const startStopBtn = document.getElementById('start-btn');

let timer = null;
// let highScore;
let randHoleId;
let numOfMoles = 5;

let gameTime;
let playClock = 10;
let countFlg = 0;
let moleTime = 1000;

const randomMoleHole = () => {
    holes.forEach(hole => {
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
        randHoleId = randHole.id;
        countFlg++;
    }
    countFlg = 0;
}

const getPointsPerMole = () => {
    // if(localStorage.getItem('currentScore')) {
    //     userScore.textContent = 
    // }
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

const moleGameStart = () => {
    getPointsPerMole();
    if (timer === null) {
        timer = setInterval(randomMoleHole, moleTime);
        startStopBtn.innerText = 'Stop'
    } else if (timer) {
        clearInterval(timer);
        timer = null;
        startStopBtn.innerText = 'Start'
    }
}

startStopBtn.addEventListener('click', moleGameStart);