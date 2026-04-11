import { nanoid } from "nanoid";
import shortUrlModel from "../models/shortUrl.model.js";


export async function sendUrl (req, res){
    try{
    const {url} = req.body;
    //console.log(url);

    const shortUrl = nanoid(7);

    const newUrl = new shortUrlModel({
        fullUrl : url,
        shortUrl : shortUrl
    })

    await newUrl.save();

    // return res.send(nanoid(7));

    return res.status(201).json({
        message : "New short URL is generated", 
        shorturl : url + shortUrl
    })
    }
    catch(error) {
        return res.staus(404).json({
            message : "Internal Server error"
        })
    }

};


export async function getShortUrl(req, res){
    try{
    const { id } = req.params; 
    
    if(!id) {
        return res.status(401).json({
            message : "Please Enter the Short Url"
        })
    }

    const url = await shortUrlModel.findOneAndUpdate({
        shortUrl : id,
    }, 
    {
        $inc : {clicks : 1}
    }
    )

    if(url) {

        //return res.redirect(url.fullUrl);

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
    }
    catch(error) {
        return res.status(404).json({
            message : "Internal Server Error"
        })
    }
};

