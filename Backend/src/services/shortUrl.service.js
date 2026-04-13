import { nanoid } from "nanoid";
import * as shortUrlDao from "../dao/shortUrl.dao.js";

export const crateShortUrlWithoutUser = async (url) => {
    const shortUrl = nanoid(7);

    if(!shortUrl) {
        throw new Error("Short URL is not generated");
    }

    await shortUrlDao.saveShortUrl(shortUrl, url);

    return shortUrl;
};


export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug ? slug : nanoid(7);

    const findShortUrl = await shortUrlDao.getCustomShortUrl(shortUrl);
    
    if(!findShortUrl) {
        throw new Error("Short URL is already exists");
    };

    await shortUrlDao.saveShortUrl(shortUrl, url, userId);

    return shortUrl;
};