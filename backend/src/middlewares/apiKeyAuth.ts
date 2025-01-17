import { Request,Response,NextFunction} from "express";
import dotenv from 'dotenv'


dotenv.config();

const generateApiValue = ():string =>{
    let key = Math.random().toString(36).substring(2,15);
    console.log("generate api key: ",key);
    return key
}

const API_KEY = process.env.API_KEY || 'TOKEN'
let apiValue :string = generateApiValue();
let lastUpdated:number = 0;

export const getApiValue = ():string=>{
    return apiValue;
}


const refreshApiValue = () =>{
    apiValue = generateApiValue();
    lastUpdated=Date.now();
    console.log(`API UPDATED: ${apiValue}`)
}

// refreshApiValue();
global.setInterval(()=>{
    refreshApiValue();
    },10*60*1000)

    export const validateApiKey = (req:Request,res:Response,next:NextFunction):void=>{
        // const apikey = req.headers[''];
        // console.log(req.headers.authorization)
        const requestKey = req.headers.authorization;
        // console.log("requestKey", requestKey)
        if(!requestKey || requestKey !== `Bearer ${apiValue}`){
            res.status(401).json({message:"unauthorised : Invalid Api Key"});
            return;
        }
        next();
    }