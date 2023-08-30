import axios from "axios";


let account=JSON.parse(localStorage.getItem('account')) ?? {};

const customAxios = axios.create({
  
    headers: {
        Authorization: `Bearer ${account.token}`
    },
    baseURL: 'http://localhost:8080/'
})
export default customAxios;