import store from "../redux/index.js"
import { getPointsPerMole } from "./score.js";
const holes = document.querySelectorAll('.hole');


let moleTime = store.getState().time.moleTime
let numOfMoles = 5;
let countFlag = 0;
let moleMovementTimeoutId;

export const randomMoleHole = () => {
    moleTime = Math.ceil(Math.random() * 3) * 1000;
    if (store.getState().time.timer === false) {
        clearTimeout(moleMovementTimeoutId);
    } else {
        moleMovementTimeoutId = setTimeout(randomMoleHole, moleTime)
        holes.forEach(hole => {

            if (hole.classList.contains('mole')) {
                hole.classList.remove('mole');
            }
        })
        numOfMoles = Math.ceil(Math.random() * 5)
        while (countFlag < numOfMoles) {
            let randHole = holes[Math.floor(Math.random() * 24)];
            randHole.classList.add('mole')
            countFlag++;
        }
        countFlag = 0;
    }
}