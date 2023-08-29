import axiosInstance from "./api"

export const findAllCategory=()=> axiosInstance.get("/categories/findAll")