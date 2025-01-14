import express from "express";
import cors from "cors";
import {Client} from "pg";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}))

const con = new Client({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    port:Number(process.env.DB_PORTNO),
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

con.connect().then(()=> console.log("Connected Successfully"));


//apis for diagrams and details
app.get("/api/fetchinsights/:id",(req,res)=>{ 
    const id = req.params.id;
    const fetch_query = `select casename,dateopen,status,co2,h2o,o2,n2 from cases where casenumber = $1;`;
    con.query(fetch_query,[id],(err,result)=>{
        if(!err)
        {
            res.send(result.rows)
        }
        else{
            res.send(err.message)
        }
    })
    
})


// apis for cases
app.get("/api/fetchContri",(req,res)=>{
    const fetch_query = `select casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing from cases where contributing = 'contributing' order by casenumber desc;`;
    con.query(fetch_query,(err,result)=>{
        if(!err)
        {
            // console.log(result.rows)
            res.send(result.rows)
        }
        else{
            // console.log(err)
            res.send(err.message)
        }
    })
})


app.get("/api/fetchAll",(req,res)=>{
    const fetch_query = `select casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing from cases order by casenumber desc; `;
    con.query(fetch_query,(err,result)=>{
        if(!err)
        {
            res.send(result.rows)
        }
        else{
            res.send(err.message)
        }
    })
})

app.post("/api/postCases",(req,res)=>{
    const {casename,priority,type,status,opendate,contributing,statuskey}:any = req.body;
    const {co2,h2o,o2,n2}=req.body
    const post_query=`Insert into cases ("casename","priority","type","status","opendate","co2","h2o","o2","n2","contributing","statuskey")Values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
    // console.log(co2,h2o,o2,n2)
    // const sum = Number(co2)+Number(h2o)+Number(o2)+Number(n2);
    // co2 =(((co2/sum))*100).toFixed(2);
    // h2o = (((h2o)/sum)*100).toFixed(2);
    // o2=(((o2)/sum)*100).toFixed(2);
    // n2=(((n2)/sum)*100).toFixed(2);
    // console.log(co2, h2o, n2, o2)
    con.query(post_query,[casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey],(err,result)=>{
        if(!err)
        {
            console.log("posted");
            res.status(201).json({message:"Posted Data"});
        }
        else{
            console.log(err);
            res.send(err);
        }
    })
})

app.get("/api/priority",(req,res)=>{
    const get_priority = `select priority, count(*) as count from cases group by priority ;`

    con.query(get_priority,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            // console.log(result.rows);
            res.send(result.rows)
        }
    })
})
 
app.get("/api/contriPriority",(req,res)=>{
    const get_priority = `select priority, count(*) as count from cases where contributing = 'contributing' group by priority ;`

    con.query(get_priority,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            // console.log(result.rows);
            res.send(result.rows)
        }
    })
})


app.put("/api/updateCases/:id",(req,res)=>{
    const id = req.params.id; //params means value taken from api link here id
    const {casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey} = req.body;

    const update_query = `UPDATE cases SET "casename"=$1,"priority"=$2,"type"=$3,"status"=$4,"opendate"=$5,"contributing"=$6,"co2"=$7,"h2o"=$8,"o2"=$9,"n2"=$10,"statuskey"=$11 where casenumber=$12`

    con.query(update_query,[casename,priority,type,status,opendate,contributing,co2,h2o,o2,n2,statuskey,id],(err,result)=>{
        if(err)
        {
            res.send(err);
            console.log(err);
        }
        else
        {
            res.status(201).json({message:"Updated Data"})
        }
    })
})


app.delete("/api/deleteCases/:id",(req,res)=>{
    const id= req.params.id;
    const delete_query = "DELETE from cases where casenumber=$1";

    con.query(delete_query,[id],(err,result)=>{
        if(err)
        {
            res.send(err);
        }
        else{
            res.status(201).json({message:"Deleted Data"});
            console.log("deleted");
        }
    })
})

app.get("/api/fetchId/:casename",(req,res)=>{ 
    const casename = req.params.casename;  //,priority,type,status,opendate
    const fetchId = `select casenumber from cases where (casename='${casename}');` //and priority='${priority}' and type='${type}' and status='${status}' and opendate='${opendate}'
    con.query(fetchId, (err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            // console.log(result.rows);
            res.send(result.rows)
        }
    })
})

app.get("/api/validateCasename/:casename",(req,res)=>{ 
    const casename = req.params.casename;  //,priority,type,status,opendate
    const fetchId = `select casename from cases where casename=$1;` //and priority='${priority}' and type='${type}' and status='${status}' and opendate='${opendate}'
    con.query(fetchId,[casename], (err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            // console.log(result.rows);
            res.send(result)
            // console.log(result.rowCount)
        }
    })
})

app.listen(process.env.PORT,()=>console.log("Server running on port 5000"))