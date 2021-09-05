const { combineReducers, createStore } = Redux;
import scoreReducer from "./score.js";
import timerReducer from "./timer.js";

const rootReducer = combineReducers({
    score: scoreReducer,
    time: timerReducer
});

const store = createStore(rootReducer);
store.subscribe(() => {
})
export default store;