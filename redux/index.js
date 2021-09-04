const { combineReducers, createStore } = Redux;
import scoreReducer from "./score.js";

const rootReducer = combineReducers({
    score: scoreReducer
});

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log(store.getState())
})
export default store;