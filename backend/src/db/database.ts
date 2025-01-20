import {Pool} from 'pg'
import { dbConfig } from '../config/config'

const pool = new Pool(dbConfig);

pool.connect((err,client,release)=>{
    if(err){
        console.error('error connecting database');
    }
    else{
        // console.log("Database connected successfully");
        release();
    }
})

export default pool;