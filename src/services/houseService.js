import axios from "axios";

export const createHouse=(house) =>{
    return axios.post("http://localhost:8080/houses/save",house)
}

