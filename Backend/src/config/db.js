import mongoose from "mongoose";

async function connectToDB() {
    try{
       await mongoose.connect(process.env.MONGO_URI);
       console.log("DB is connected to Server succesfully");
    }
    catch(error) {
        console.log("DB is not connected to Server");
    }
}


export default connectToDB;