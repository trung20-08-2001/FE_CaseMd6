import { createSelector } from "@reduxjs/toolkit";
import removeDiacritics from 'remove-diacritics';

export const listMyHouseDTO = (state) => state.house.myHousesDTO;
export const filterStatusHouse = (state) => state.house.statusHouse;
export const filterNameHouseSearch = (state) => state.house.nameHouseSearch;
export const filterNameAddress = (state) => state.house.nameAddress;
export const filterBedroom = (state) => state.house.bedroom;
export const filterBathroom = (state) => state.house.bathroom;
export const filterPriceHouse = (state) => state.house.priceHouse;
export const allHouse = state => state.house.allHouse;


export const filterbillHistoryHost = state => state.bill.billHistoryHost;
export const filternameHouseSearch = state => state.bill.nameHouseSearch;
export const filterdateCheckin = state => state.bill.dateCheckin;
export const filterdateCheckout = state => state.bill.dateCheckout;
export const filterstatus = state => state.bill.status;


export const filterHouseByNameAndStatus = createSelector(
  listMyHouseDTO,
  filterStatusHouse,
  filterNameHouseSearch,
  (listHouseDTO, nameStatus, nameHouseSearch) => {
    return listHouseDTO.filter(houseDTO => {
      if (nameStatus === "ALL") {
        return nameHouseSearch === "" ? houseDTO : removeDiacritics(houseDTO.house.name).toLowerCase().includes(removeDiacritics(nameHouseSearch).toLowerCase());
      }
      return (
        removeDiacritics(houseDTO.house.name).toLowerCase().includes(removeDiacritics(nameHouseSearch).toLowerCase()) &&
        houseDTO.house.status.name=== nameStatus
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
      return (removeDiacritics(item.house.address).toLowerCase()).includes(removeDiacritics(nameAddress).toLowerCase())
        && item.house.numberOfBedrooms==bedroom
        && item.house.numberOfLivingRooms==bathroom
        && parseInt(item.house.price)<=parseInt(priceHouse)
    })
  }
)


export const filterBillHistoryHost = createSelector(
  filterbillHistoryHost,
  filternameHouseSearch,
  filterdateCheckin,
  filterdateCheckout,
  filterstatus,
  (allBill, nameHouse, dateCheckin, dateCheckout, status) => {
    return allBill.filter((bill) => {
      const isNameHouseMatched = removeDiacritics(bill.house.name).toLowerCase().includes(removeDiacritics(nameHouse).toLowerCase());
      const isDateCheckinMatched = new Date(bill.bill.dateCheckin).getTime() >= new Date(dateCheckin).getTime();
      const isDateCheckoutMatched = new Date(bill.bill.dateCheckout).getTime() <= new Date(dateCheckout).getTime();
      const isStatusMatched = bill.bill.status.name === status;
      if (status === "ALL") {
        return isNameHouseMatched && isDateCheckinMatched && isDateCheckoutMatched
      } else {
        return isNameHouseMatched && isDateCheckinMatched && isDateCheckoutMatched && isStatusMatched
      }
    })
  }
)