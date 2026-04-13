import { getShortUrl } from "../dao/shortUrl.dao.js"
import * as shortUrlService from "../services/shortUrl.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    let shortUrl
    if(req.user){
        shortUrl = await shortUrlService.createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{  
        shortUrl = await shortUrlService.crateShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : shortUrl});
})


export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.fullUrl)
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body
    const shortUrl = await shortUrlService.crateShortUrlWithoutUser(url,slug);
    res.status(200).json({shortUrl : shortUrl});
})