export function addScore(amount = 1) {
    return {
        type: "ADD_SCORE",
        payload: amount
    };
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
        case "RESET_SCORE":
            return score = 0;
        default:
            return score;
    }
}