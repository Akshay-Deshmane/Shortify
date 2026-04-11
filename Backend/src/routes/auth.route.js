import express from "express";
import { Router } from "express";
import userModel from "../models/user.modle.js";
import * as userAuth from "../controller/userAuth.controller.js"

const authRouter = Router();


authRouter.post("/register", userAuth.register);

authRouter.post("/login", userAuth.login);


export default authRouter;