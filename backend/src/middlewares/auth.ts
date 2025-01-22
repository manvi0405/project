import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
// import { jwtSecret } from "../config/config";

export const authenticateToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers['authorization'];

    if(!token){
        return res.status(403).send('Token is Missing');
    }

    try{
        // const decoded = jwt.verify(token,jwtSecret);
        // (req as any).user=decoded;
        next();
    }
    catch(err){
        res.status(401).send('Invalid Token');
    }
}