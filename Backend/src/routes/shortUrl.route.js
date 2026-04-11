import experss from "express"
import { Router } from "express";
import * as shortURL from "../controller/shortUrl.controller.js";

const shortUrlRouter = Router();

shortUrlRouter.post("/", shortURL.sendUrl);

shortUrlRouter.get("/:id", shortURL.getShortUrl);


export default shortUrlRouter;