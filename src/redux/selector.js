import { createSelector } from "@reduxjs/toolkit";

export const listMyHouseDTO = (state) => state.house.myHousesDTO;
export const filterStatusHouse = (state) => state.house.statusHouse;
export const filterNameHouseSearch = (state) => state.house.nameHouseSearch;

export const filterHouseByNameAndStatus = createSelector(
  listMyHouseDTO,
  filterStatusHouse,
  filterNameHouseSearch,
  (listHouseDTO, nameStatus, nameHouseSearch) => {
    return listHouseDTO.filter(houseDTO => {
      if (nameStatus === "ALL") {
        return nameHouseSearch === "" ? houseDTO : houseDTO.house.name.toLowerCase().includes(nameHouseSearch.toLowerCase());
      }
      return(
        houseDTO.house.name.toLowerCase().includes(nameHouseSearch.toLowerCase()) &&
        houseDTO.house.status.name===nameStatus
      )
    });
  }
);