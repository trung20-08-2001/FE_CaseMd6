import { createSlice } from "@reduxjs/toolkit"
import { saveHouse, findHouseByAccount, editHouse, findTopHouse, findAllHouse, findHouseTopSearch, changePageCurrent } from "../../services/houseService"
import { filterStatusHouse, nameHouseSearch } from "../../services/filterService"
import {
    filterBathroom,
    filterBedroom,
    filterNameAddress,
    filterPriceMin,
    filterPriceMax
} from "../../services/filterService";

const initState = {
    myHousesDTO:  {
        data:[],
        loading:false
    },   
    topHouse: {
        data:[],
        loading:false
    },
    allHouse: {
        data:{
            content:[],
            totalPages:1,
            currentPage:0
        },
        loading:false
    },
    topSearch:[],
    statusHouse:"ALL",
    nameHouseSearch:"",
    nameAddress:"",
    bedroom:0,
    bathroom:0,
    priceMin:0,
    priceMax:10000000,
    searched:false
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
            state.myHousesDTO.data = action.payload;
            state.myHousesDTO.loading=false;
        })
        build.addCase(findHouseByAccount.rejected, (state, action) => {
            state.myHousesDTO.data = [];
        })
        build.addCase(findHouseByAccount.pending, (state, action) => {
            state.myHousesDTO.data = [];
            state.myHousesDTO.loading=true
        })
        build.addCase(findTopHouse.fulfilled, (state, action) => {
            state.topHouse.data = action.payload;
            state.topHouse.loading = false;
        })
        build.addCase(findTopHouse.rejected, (state, action) => {
            state.topHouse.data = []
            state.topHouse.loading = true
        })
        build.addCase(findTopHouse.pending, (state, action) => {
            state.topHouse.data = []
            state.topHouse.loading = true
        })
        build.addCase(findAllHouse.fulfilled, (state, action) => {
            state.allHouse.data.content[state.allHouse.data.currentPage] = action.payload.content;
            state.allHouse.data.totalPages= action.payload.totalPages;
            state.allHouse.loading=false;
        })
        build.addCase(findAllHouse.rejected, (state, action) => {
            state.allHouse.data.content = []
        })
        build.addCase(findAllHouse.pending, (state, action) => {
            state.allHouse.data.content[state.allHouse.data.currentPage] = []
            state.allHouse.loading=true;
        })
        build.addCase(changePageCurrent.fulfilled,(state, action) => {
            state.allHouse.data.currentPage= action.payload;
        })
        build.addCase(filterStatusHouse.fulfilled, (state, action) => {
            state.statusHouse = action.payload
        })
        build.addCase(nameHouseSearch.fulfilled, (state, action) => {
            state.nameHouseSearch = action.payload
        })

        build.addCase(filterNameAddress.fulfilled, (state, action) => {
            state.nameAddress = action.payload
            state.searched=true;
        })
        build.addCase(filterBedroom.fulfilled, (state, action) => {
            state.bedroom = action.payload
            state.searched=true;
        })
        build.addCase(filterBathroom.fulfilled, (state, action) => {
            state.bathroom = action.payload
            state.searched=true;
        })
        build.addCase(filterPriceMin.fulfilled, (state, action) => {
            state.priceMin = action.payload;
            state.searched=true;
        })
        build.addCase(filterPriceMax.fulfilled, (state, action) => {
            state.priceMax = action.payload
            state.searched=true;
        })
        build.addCase(findHouseTopSearch.fulfilled,(state,action) => {
            state.topSearch=action.payload
        })
        build.addCase(findHouseTopSearch.pending,(state,action)=>{
            state.topSearch=[]
        })
        build.addCase(findHouseTopSearch.rejected,(state,action)=>{
            state.topSearch=[]
        })  
    }
})


export default houseSlice.reducer;
