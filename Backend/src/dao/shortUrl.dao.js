import shortUrlModel from "../models/shortUrl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try{
        const newUrl = new shortUrlModel({
            fullUrl:longUrl,
            shortUrl:shortUrl
        })
        if(userId){
            newUrl.user = userId;
        }
        await newUrl.save()
    }catch(err){
        if(err.code == 11000){
            throw new Error("Short URL already exists")
        }
        throw new Error(err)
    }
};

export const getShortUrl = async (shortUrl) => {
    return await shortUrlModel.findOneAndUpdate({shortUrl:shortUrl},{$inc:{clicks:1}});
}

export const getCustomShortUrl = async (slug) => {
    return await shortUrlModel.findOne({shortUrl:slug});
}