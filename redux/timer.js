export function setTimer() {
    return {
        type: "SET_TIMER"
    }
}

export function reloadTimer() {
    return {
        type: "RELOAD_TIMER"
    }
}

const initState = {
    timer: false,
    playClock: 10
}

export default function timerReducer(state = initState, action) {
    switch (action.type) {
        case "SET_TIMER":
            let changedTimer = !state.timer;
            return { ...state, timer: changedTimer }
        case "RELOAD_TIMER":
            let dbTimer = localStorage.getItem('playClock')
            return { ...state, playClock: dbTimer };
        default:
            return state;
    }
}