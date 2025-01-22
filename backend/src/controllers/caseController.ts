import { Request,Response } from "express";
<<<<<<< HEAD
import {caseService} from '../services/casesService';
import {CaseDao} from '../dao/caseDao';
 
=======
import { caseService } from "../services/casesService";
// const caseDao = require('../dao/caseDao');

>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
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
<<<<<<< HEAD
 
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
=======



export const getInsights = async(req:Request,res:Response)=>{
    const id:number = parseInt(req.params.id); //params means value taken from api link here id
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
   
 
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
<<<<<<< HEAD
 
=======

>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
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
<<<<<<< HEAD
 
 
=======


>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
export const postCases = async(req:Request,res:Response)=>{
    try{
         const {casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2}=req.body;
         const result = await caseService.postCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2);
<<<<<<< HEAD
=======

>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
         res.status(200).json({message:"Posted data succesfully"})
    }
    catch(err){
        res.status(500).json({error:'error adding case'})
    }
}
 
export const updateCases = async(req:Request,res:Response)=>{
<<<<<<< HEAD
    const id:number = Number(req.params.id);
    //params means value taken from api link here id
=======
    const id:number = parseInt(req.params.id); 
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
    const {casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey} = req.body;
 
    try{
        const result = await caseService.updateCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2,id);
<<<<<<< HEAD
=======
        console.log(result);
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
        res.status(200).json({message:"updated data successfully"})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while updating case'})
    }
}
 
 
export const deleteCases = async(req:Request,res:Response)=>{
<<<<<<< HEAD
    const id = Number(req.params.id); //params means value taken from api link here id
   
 
    try{
        const result = await caseService.deleteCases(id);
=======
    const id:number = parseInt(req.params.id); 
    

    try{
        const result = await caseService.deleteCases(id);
        console.log(result);
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
        res.status(200).json({message:"deleted data successfully "})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while deleting case'})
    }
}
 
 
export const getId = async(req:Request,res:Response)=>{
<<<<<<< HEAD
    const casename = req.params.casename; //params means value taken from api link here id
   
    try{
        const result: any = await caseService.getId(casename);
=======
    const casename:string = req.params.casename; //params means value taken from api link here id
    
    try{
        const result = await caseService.getId(casename) as any;
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching id'})
    }
}
<<<<<<< HEAD
 
export const validateCasename = async(req:Request,res:Response)=>{
    const casename = req.params.casename;  //,priority,type,status,opendate
    const fetchCasename = `select casename from cases where casename=$1;` //and priority='${priority}' and type='${type}' and status='${status}' and opendate='${opendate}'
   
    try{
        const result = await caseService.validateCasename(casename);
=======

export const getCasename = async(req:Request,res:Response)=>{
    const casename = req.params.casename  //,priority,type,status,opendate
  
    
    try{
        const result = await caseService.getCasename(casename);
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching casename'})
    }
}