import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import checkinReducer from "./slices/medicalUserSlice"
import covidTestReducer from "./slices/covidTestSlice"
import questionReducer from "./slices/questionSlice"
const rootReducer = {
    userStore: userReducer,
    checkinListStore: checkinReducer,
    covidTestStore: covidTestReducer,
    questionStore: questionReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;