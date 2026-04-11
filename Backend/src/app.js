import express from "express";
import shortUrlRouter from "./routes/shortUrl.route.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


app.use("/api/create", shortUrlRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});


export default app;