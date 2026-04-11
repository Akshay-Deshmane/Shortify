import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import userModel from "../models/user.modle.js";

export async function register(req, res) {
   try {

    const { username, email, password } = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({
        email
    });

    if(isUserAlreadyRegistered) {
        return res.status(409).json({
            message : "User already registered, Please check your email"
        })
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password : hashedPassword
    });

    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET,
    {
        expiresIn : "7d"
    });
    
    res.cookie("token", token, {
        httpOnly : true,
        secure : true,
        sameSite : "lax",
        maxAge : 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        message : "New User Created",
        token : token
    })

   }
   catch(error) {

    return res.status(500).json({
            message: "Server error",
            error: error.message
    });

   }

};



export async function login(req, res) {
    try {
        
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "User logged in successfully",
            token
        });

    } 
    catch (error) {

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
        
    }
}

