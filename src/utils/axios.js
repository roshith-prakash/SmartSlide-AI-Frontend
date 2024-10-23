import axios from "axios"

export const devURL = "http://localhost:4000/api/v1"
export const prodURL = "https://ppt-creator.onrender.com/api/v1/"

// Creating an instance of axios to make API calls to server
export const axiosInstance = axios.create({
    baseURL: prodURL
})