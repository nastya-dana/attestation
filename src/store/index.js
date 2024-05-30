import { configureStore } from "@reduxjs/toolkit"
import pollutionReducer from "./pollutionSlice/index"

export const store = configureStore({
    reducer: {
        pollution: pollutionReducer
    },
    devTools: true
})