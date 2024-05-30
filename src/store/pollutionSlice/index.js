import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coord: [],
    components: []
}

const pollutionSlice = createSlice({
    name: 'pollution',
    initialState: initialState,
    reducers: {
        addPollutionCoord : (state, action) => {
            state.coord = action.payload
        },
        addPollutionList : (state, action) => {
            state.components = action.payload
        }
    }
})

export const {addPollutionCoord,addPollutionList} = pollutionSlice.actions
export default pollutionSlice.reducer