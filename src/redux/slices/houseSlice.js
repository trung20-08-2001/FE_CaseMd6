import { createSlice } from "@reduxjs/toolkit"
import { saveHouse, findHouseByAccount, editHouse, findTopHouse, findAllHouse } from "../../services/houseService"
import { filterStatusHouse, nameHouseSearch } from "../../services/filterService"
import {
    filterBathroom,
    filterBedroom,
    filterNameAddress,
    filterPriceMin,
    filterPriceMax
} from "../../services/filterService";

const initState = {
    myHousesDTO: [],   
    topHouse: [],
    allHouse:[],
    statusHouse:"ALL",
    nameHouseSearch:"",
    nameAddress:"",
    bedroom:0,
    bathroom:0,
    priceMin:0,
    priceMax:10000000,
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
            state.myHousesDTO = [];
        })
        build.addCase(saveHouse.pending, (state, action) => {   
            state.myHousesDTO = [];
        })
        build.addCase(editHouse.fulfilled, (state, action) => {
            let {house, images, indexHouseEdit} = action.payload;
            state.myHousesDTO = [
                ...state.myHousesDTO.slice(0, indexHouseEdit),
                {house, images},
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
        build.addCase(findTopHouse.fulfilled, (state, action) => {
            state.topHouse = action.payload;
        })
        build.addCase(findTopHouse.rejected, (state, action) => {
            state.topHouse = []
        })
        build.addCase(findTopHouse.pending, (state, action) => {
            state.topHouse = []
        })
        build.addCase(findAllHouse.fulfilled, (state, action) => {
            state.allHouse = action.payload;
        })
        build.addCase(findAllHouse.rejected, (state, action) => {
            state.allHouse = []
        })
        build.addCase(findAllHouse.pending, (state, action) => {
            state.allHouse = []
        })
        build.addCase(filterStatusHouse.fulfilled, (state, action) => {
            state.statusHouse = action.payload
        })
        build.addCase(nameHouseSearch.fulfilled, (state, action) => {
            state.nameHouseSearch = action.payload
        })

        build.addCase(filterNameAddress.fulfilled, (state, action) => {
            state.nameAddress = action.payload
        })
        build.addCase(filterBedroom.fulfilled, (state, action) => {
            state.bedroom = action.payload
        })
        build.addCase(filterBathroom.fulfilled, (state, action) => {
            state.bathroom = action.payload
        })
        build.addCase(filterPriceMin.fulfilled, (state, action) => {
            state.priceMin = action.payload
        })
        build.addCase(filterPriceMax.fulfilled, (state, action) => {
            state.priceMax = action.payload
        })
    }
})


export default houseSlice.reducer;
