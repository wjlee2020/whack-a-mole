import store from "../redux/index.js"
import { getPointsPerMole } from "./score.js";
const holes = document.querySelectorAll('.hole');

let moleMovementTime;
let moleTime = 1000;
let numOfMoles = 5;
let countFlg = 0;

export const randomMoleHole = () => {
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