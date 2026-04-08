import mongoose from "mongoose";


const shortUrlSchema = new mongoose.Schema({
    fullUrl : {
        type : String,
        required : true,
    },
    shortUrl : {
        type : String,
        required : true,
        unique : true,
    },
    clicks : {
        type : Number,
        required : true,
        default : 0,
    }, 
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
});

const shortUrlModel = mongoose.model("shortUrl", shortUrlSchema);

export default shortUrlModel;