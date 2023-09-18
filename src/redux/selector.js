import {createSelector} from "@reduxjs/toolkit";

export const listMyHouseDTO = (state) => state.house.myHousesDTO;
export const filterStatusHouse = (state) => state.house.statusHouse;
export const filterNameHouseSearch = (state) => state.house.nameHouseSearch;
export const filterNameAddress = (state) => state.house.nameAddress;
export const filterBedroom = (state) => state.house.bedroom;
export const filterBathroom = (state) => state.house.bathroom;
export const filterPriceHouse = (state) => state.house.priceHouse;
export const allHouse = state => state.house.allHouse;
export const filterHouseByNameAndStatus = createSelector(
    listMyHouseDTO,
    filterStatusHouse,
    filterNameHouseSearch,
    (listHouseDTO, nameStatus, nameHouseSearch) => {
        return listHouseDTO.filter(houseDTO => {
            if (nameStatus === "ALL") {
                return nameHouseSearch === "" ? houseDTO : houseDTO.house.name.toLowerCase().includes(nameHouseSearch.toLowerCase());
            }
            return (
                houseDTO.house.name.toLowerCase().includes(nameHouseSearch.toLowerCase()) &&
                houseDTO.house.status.name === nameStatus
            )
        });
    }
);

export const filterSearchHouse = createSelector(
    allHouse,
    filterNameAddress,
    filterBedroom,
    filterBathroom,
    filterPriceHouse,
    (allHouse, nameAddress, bedroom, bathroom, priceHouse) => {
        return allHouse.filter(item => {
            const addressMatch = nameAddress === '' || item.house.address.toLowerCase().includes(nameAddress.toLowerCase());
            const bedroomMatch = bedroom === 0 || item.house.numberOfBedrooms === bedroom;
            const bathroomMatch = bathroom === 0 || item.house.numberOfLivingRooms === bathroom;
            const priceMatch = priceHouse === 1000000 || item.house.price <= priceHouse;
            return addressMatch && bedroomMatch && bathroomMatch && priceMatch;
        });
    }
)