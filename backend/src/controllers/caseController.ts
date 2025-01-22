import { Request,Response } from "express";
import {caseService} from '../services/casesService';
import {CaseDao} from '../dao/caseDao';
 
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
 
// export const getContri = async(req:Request,res:Response)=>{
//     try{
//         const result = await  caseService.getContri();
//         res.status(200).json(result)
//     }
//     catch(err)
//     {
//         res.status(500).json({error:'error fetching case'})
//     }
// }
 
export const getInsights = async(req:Request,res:Response)=>{
    const id = Number(req.params.id); //params means value taken from api link here id
   
 
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
    const id:number = Number(req.params.id);
    //params means value taken from api link here id
    const {casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey} = req.body;
 
    try{
        const result = await caseService.updateCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2,id);
        res.status(200).json({message:"updated data successfully"})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while updating case'})
    }
}
 
 
export const deleteCases = async(req:Request,res:Response)=>{
    const id = Number(req.params.id); //params means value taken from api link here id
   
 
    try{
        const result = await caseService.deleteCases(id);
        res.status(200).json({message:"deleted data successfully "})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while deleting case'})
    }
}
 
 
export const getId = async(req:Request,res:Response)=>{
    const casename = req.params.casename; //params means value taken from api link here id
   
    try{
        const result: any = await caseService.getId(casename);
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching id'})
    }
}
 
export const validateCasename = async(req:Request,res:Response)=>{
    const casename = req.params.casename;  //,priority,type,status,opendate
    const fetchCasename = `select casename from cases where casename=$1;` //and priority='${priority}' and type='${type}' and status='${status}' and opendate='${opendate}'
   
    try{
        const result = await caseService.validateCasename(casename);
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching casename'})
    }
}