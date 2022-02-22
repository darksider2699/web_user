import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import questionReducer from "./slices/questionSlice"
const rootReducer = {
    userStore: userReducer,
    questionStore: questionReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;