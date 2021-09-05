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

export function setDefault() {
    return {
        type: "SET_DEFAULT"
    }
}

const initState = {
    timer: false,
    playClock: 10,
    moleTime: 1000
}

export default function timerReducer(state = initState, action) {
    switch (action.type) {
        case "SET_TIMER":
            let changedTimer = !state.timer;
            return { ...state, timer: changedTimer }
        case "RELOAD_TIMER":
            let dbTimer = localStorage.getItem('playClock') || 'Press Start'
            return { ...state, playClock: dbTimer };
        case "SET_DEFAULT":
            return initState;
        default:
            return state;
    }
}