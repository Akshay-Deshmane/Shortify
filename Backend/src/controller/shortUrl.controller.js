import { nanoid } from "nanoid";
import shortUrlModel from "../models/shortUrl.model.js";


export async function sendUrl (req, res){
    const {url} = req.body;
    console.log(url);

    const shortUrl = nanoid(7);

    const newUrl = new shortUrlModel({
        fullUrl : url,
        shortUrl : shortUrl
    })

    newUrl.save();

    // return res.send(nanoid(7));

    return res.status(201).json({
        message : "New short URL is generated", 
        newUrl
    })
};


export async function getShortUrl(req, res){
    const { id } = req.params;

    const url = await shortUrlModel.findOne({
        shortUrl : id
    })

    if(url) {

        // return res.redirect(url.fullUrl);

        return res.status(200).json({
            message : "Long Url Found",
            url
        })
        
    }
    else {
        return res.status(404).json({
            message : "Url not found"
        })
    }
};

