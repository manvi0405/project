import { Request,Response } from "express";
import { caseService } from "../services/casesService";
// const caseDao = require('../dao/caseDao');

export const getAllAndContri = async(req:Request,res:Response)=>{
    try{
        const result = await caseService.getAllAndContri();
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json({error:'error fetching case'})
    }
}



export const getInsights = async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id); //params means value taken from api link here id
   

    try{
        const result = await caseService.getInsights(id);
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching insights'})
    }
}

export const getPriority = async(req:Request,res:Response)=>{
    try{
        const result = await caseService.getPriority();
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching priority count'})
    }
}


export const postCases = async(req:Request,res:Response)=>{
    try{
         const {casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2}=req.body;
         const result = await caseService.postCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2);

         res.status(200).json({message:"Posted data succesfully"})
    }
    catch(err){
        res.status(500).json({error:'error adding case'})
    }
}

export const updateCases = async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id); 
    const {casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey} = req.body;

    try{
        const result = await caseService.updateCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2,id);
        console.log(result);
        res.status(200).json({message:"updated data successfully"})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while updating case'})
    }
}


export const deleteCases = async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id); 
    

    try{
        const result = await caseService.deleteCases(id);
        console.log(result);
        res.status(200).json({message:"deleted data successfully "})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while deleting case'})
    }
}


export const getId = async(req:Request,res:Response)=>{
    const casename:string = req.params.casename; //params means value taken from api link here id
    
    try{
        const result = await caseService.getId(casename) as any;
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching id'})
    }
}

export const getCasename = async(req:Request,res:Response)=>{
    const casename = req.params.casename  //,priority,type,status,opendate
  
    
    try{
        const result = await caseService.getCasename(casename);
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching casename'})
    }
}
