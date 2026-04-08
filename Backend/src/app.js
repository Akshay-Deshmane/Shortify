import express from "express";
import shortUrlRouter from "./routes/shortUrl.route.js";


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use("/api/create", shortUrlRouter);




export default app;