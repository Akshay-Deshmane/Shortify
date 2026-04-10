import axiosInstance from "../utils/axiosInstance.js"

export const createShortUrl = async (url) =>{
    const {data} = await axiosInstance.post("http://localhost:3000/api/create/", {url})
    return data.shortUrl
}