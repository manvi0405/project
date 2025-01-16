import { Request,Response } from "express";
import pool from "../db/database";

const caseDao = require('../dao/caseDao');
export const getAll = async(req:Request,res:Response)=>{
    try{
        // const result =  await pool.query(`select casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing from cases order by casenumber desc; `);
        const result = await caseDao.getAll();
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json({error:'error fetching case'})
    }
}

export const getContri = async(req:Request,res:Response)=>{
    try{
        const result =  await  caseDao.getContri();
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json({error:'error fetching case'})
    }
}

export const getInsights = async(req:Request,res:Response)=>{
    const id = req.params.id; //params means value taken from api link here id
   

    try{
        const result = await pool.query(`select casename,opendate,status,co2,h2o,o2,n2 from cases where casenumber = $1;`,[id])
        res.status(200).json(result.rows)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching insights'})
    }
}

export const getPriority = async(req:Request,res:Response)=>{
    try{
        const result = await pool.query(`select priority, count(*) as count from cases group by priority ;`)
        res.status(200).json(result.rows)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching priority count'})
    }
}


export const getContriPriority = async(req:Request,res:Response)=>{
    try{
        const result = await pool.query(`select priority, count(*) as count from cases where contributing = 'contributing' group by priority ;`)
        res.status(200).json(result.rows)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching Contri priority count'})
    }
}



export const postCases = async(req:Request,res:Response)=>{
    try{
         const {casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2}=req.body;
         const post_query = `Insert into cases ("casename","priority","type","status","opendate","co2","h2o","o2","n2","contributing","statuskey")Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
         const result = await pool.query(post_query,[casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey])

         res.status(201).json({message:"Posted data succesfully"})
    }
    catch(err){
        res.status(500).json({error:'error adding case'})
    }
}

export const updateCases = async(req:Request,res:Response)=>{
    const id = req.params.id; //params means value taken from api link here id
    const {casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey} = req.body;

    try{
        const result = await pool.query(`UPDATE cases SET "casename"=$1,"priority"=$2,"type"=$3,"status"=$4,"opendate"=$5,"contributing"=$6,"co2"=$7,"h2o"=$8,"o2"=$9,"n2"=$10,"statuskey"=$11 where casenumber=$12`,[casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey,id])
        res.status(200).json({message:"updated data successfully "})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while updating case'})
    }
}


export const deleteCases = async(req:Request,res:Response)=>{
    const id = req.params.id; //params means value taken from api link here id
    

    try{
        const result = await pool.query(`DELETE from cases where casenumber=$1`,[id])
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
        const result = await pool.query(`select casenumber from cases where casename=$1;` ,[casename])
        res.status(200).json(result.rows)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching id'})
    }
}

export const getCasename = async(req:Request,res:Response)=>{
    const casename = req.params.casename;  //,priority,type,status,opendate
    const fetchCasename = `select casename from cases where casename=$1;` //and priority='${priority}' and type='${type}' and status='${status}' and opendate='${opendate}'
    
    try{
        const result = await pool.query(fetchCasename ,[casename])
        res.status(200).json(result)
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:'error while fetching casename'})
    }
}
