import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import mensRecordsRouter from "./routes/mensRecordRouter.js";

const app = express()
dotenv.config()
const PORT = process.env.PORT || 3000
const DB_URL = process.env.DB_URL
const FRONTEND_URL = process.env.FRONTEND_URL

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [FRONTEND_URL],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true
}))


//connection of database
mongoose.connect(DB_URL).then(() =>{
    console.log('Connected to database successfully --> Olympic-Mens-DB');
}).catch((err) =>{
    console.log('Error while connecting to database');
})

//User Router
app.use('/user' , userRouter)
app.use('/records' , mensRecordsRouter)


app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
})