import userModel from "../models/user.modle";

export async function userAuth(req, res, next) {
    try{
       const token = req.token;

       if(!token) {
        return res.status(401).json({
            message : "Unauthorized User Please Login First"
        })
       }

       const decoded = jwt.verify(token, process.env.JWT_SECRET);

       const user = await userModel.findById(decoded.id);

       if(!user) {
        return res.status(401).json({
            message : "Invalid Token or User Not Found"
        })
       }

       req.user = user;
       
       next();

    }
    catch(error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
};