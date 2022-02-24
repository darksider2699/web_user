import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import questionReducer from "./slices/questionSlice"
import vaccineReducer from "./slices/vaccineSlice"
import covidCaseReducer from "./slices/covidCaseSlice"
const rootReducer = {
    userStore: userReducer,
    questionStore: questionReducer,
    vaccineStore: vaccineReducer,
    covidCaseStore: covidCaseReducer,

}

const store = configureStore({
    reducer: rootReducer
})

export default store;