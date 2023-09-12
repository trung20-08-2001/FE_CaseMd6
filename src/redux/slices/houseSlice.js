import { createSlice } from "@reduxjs/toolkit"
import { saveHouse, findHouseByAccount, editHouse, findTopHouse, findAllHouse } from "../../services/houseService"
import { filterStatusHouse, nameHouseSearch } from "../../services/filterService"

const initState = {
    myHousesDTO: [],   // house and list images for each house
    topHouse: [],
    allHouse:[],
    statusHouse:"ALL",
    nameHouseSearch:""
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
        build.addCase(findTopHouse.fulfilled,(state,action) => {
            state.topHouse = action.payload;
        })
        build.addCase(findTopHouse.rejected,(state,action) => {      
            state.topHouse=[]
        })
        build.addCase(findTopHouse.pending,(state,action) => {
            state.topHouse=[]
        })
        build.addCase(findAllHouse.fulfilled,(state,action) => {
            state.allHouse=action.payload;
        })
        build.addCase(findAllHouse.rejected,(state,action) => {
            state.allHouse=[]
        })
        build.addCase(findAllHouse.pending,(state,action)=>{
            state.allHouse=[]
        })
        build.addCase(filterStatusHouse.fulfilled,(state,action) => {
            state.statusHouse=action.payload
        })
        build.addCase(nameHouseSearch.fulfilled,(state,action) => {
            state.nameHouseSearch=action.payload
        })
    }
})

export default houseSlice.reducer;
