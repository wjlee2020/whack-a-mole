export function addScore(amount = 1) {
    return {
        type: "ADD_SCORE",
        payload: amount
    };
}

export default function scoreReducer(score = 0, action) {
    switch (action.type) {
        case "ADD_SCORE":
            return score + action.payload;
        default:
            return score;
    }
}