export function addScore(amount = 1) {
    return {
        type: "ADD_SCORE",
        payload: amount
    };
}

export function reloadScore() {
    return {
        type: "RELOAD_SCORE"
    }
}

export function resetScore() {
    return {
        type: "RESET_SCORE"
    }
}

export default function scoreReducer(score = 0, action) {
    switch (action.type) {
        case "ADD_SCORE":
            return score + action.payload;
        case "RELOAD_SCORE":
            let dbScore = parseInt(localStorage.getItem('currentScore')) || 0;
            return score = dbScore;
        case "RESET_SCORE":
            return score = 0;
        default:
            return score;
    }
}