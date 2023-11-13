import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import mensRankRouter from "./routes/userRouter.js";

const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()
const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL


//connection of database
mongoose.connect(DB_URL).then(() =>{
    console.log('Connected to database successfully');
}).catch((err) =>{
    console.log('Error connecting to database');
})

//User Router
app.use('/user' , userRouter)
app.use('/user/record' , mensRankRouter)


app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
})