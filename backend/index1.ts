import express from "express";
import cors from "cors";
// import {con} from './connection'
const con = require('./connection')
const casesRoute = require ('./routes/cases')
const app = express();
app.use(cors());
app.use(express.json());


app.use('/cases',casesRoute)
module.exports = app;
