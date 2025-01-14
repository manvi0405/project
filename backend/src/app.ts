import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import router from "./routes/cases";

import dotenv from 'dotenv'
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.use('/api/cases',router)

app.listen(process.env.PORT,()=>{
    console.log(`server running on port:${process.env.PORT}`)
})