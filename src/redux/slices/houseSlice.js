import { createSlice } from "@reduxjs/toolkit"
import { saveHouse, findHouseByAccount, editHouse } from "../../services/houseService"

const initState = {
    myHousesDTO: []   // house and list images for each house
}

const houseSlice = createSlice({
    name: "houses",
    initialState: initState,
    reducers: {},
    extraReducers: build => {
        build.addCase(saveHouse.fulfilled, (state, action) => {
            state.myHousesDTO = [action.payload, ...state.myHousesDTO];
        })
        build.addCase(saveHouse.rejected, (state, action) => {
            state.myHousesDTO = state.myHousesDTO;
        })
        build.addCase(saveHouse.pending, (state, action) => {   
            state.myHousesDTO = state.myHousesDTO;
        })
        build.addCase(editHouse.fulfilled,(state, action) => {
            let {house,images,indexHouseEdit}=action.payload;
            state.myHousesDTO = [
              ...state.myHousesDTO.slice(0, indexHouseEdit),
              { house, images },
              ...state.myHousesDTO.slice(indexHouseEdit + 1)
            ];
        })
        build.addCase(findHouseByAccount.fulfilled, (state, action) => {
            state.myHousesDTO = action.payload
        })
        build.addCase(findHouseByAccount.rejected, (state, action) => {
            state.myHousesDTO = [];
        })
        build.addCase(findHouseByAccount.pending, (state, action) => {
            state.myHousesDTO = [];
        })
    }
})

export default houseSlice.reducer;