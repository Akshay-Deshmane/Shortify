import { nanoid } from "nanoid";
import shortUrlModel from "../models/shortUrl.model";


export const crateShortUrlWithoutUser = async (url) => {
    const shortUrl = nanoid(7);

    if(!shortUrl) {
        throw new Error("Short URL is not generated");
    }

    await shortUrlModel.create({
        fullUrl : url,
        shortUrl : shortUrl
    });

    return shortUrl;
};
