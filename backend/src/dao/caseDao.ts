import pool from "../db/database";

class CaseDao{
    async getAll(){
        let statement = `select casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing from cases order by casenumber desc; `;
        try
        {
            const result = await pool.query(statement);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }
    
    async getContri()
    {
        let statement = `select casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing from cases where contributing = 'contributing' order by casenumber desc; `;
        try
        {
            const result = await pool.query(statement);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }   

    async getInsights(id: number)
    {
        let statement = `select casename,opendate,status,co2,h2o,o2,n2 from cases where casenumber = $1;`;
        try
        {
            const result = await pool.query(statement,[id]);
            return result.rows;
        }
        catch(err)
        {
            return err;
        }
    }

    async getPriority()
    {
        let statement = `select priority, count(*) as count from cases group by priority ;`;
        try{
            const result = await pool.query(statement);
            return result.rows;
        }
        catch(err)
        {return err}
    }
    
    async getContriPriority(){
        let statement = `select priority, count(*) as count from cases where contributing = 'contributing' group by priority ;`;
        try{
            const result  = await pool.query(statement);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }
    async postCases(casename:string,priority:string,type:string,status:string,opendate:string,contributing:string,statuskey:string,co2:number,h2o:number,o2:number,n2:number){
        let statement = `insert into cases(casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
        try{
            const result = await pool.query(statement,[casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey]);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }

    async updateCases(casename:string,priority:string,type:string,status:string,opendate:string,contributing:string,statuskey:string,co2:number,h2o:number,o2:number,n2:number,id:number){
        let statement = `update cases set casename=$1,priority=$2,type=$3,status=$4,opendate=$5,co2=$6,h2o=$7,o2=$8,n2=$9,contributing=$10,statuskey=$11 where casenumber=$12`;
        try{
            const result = await pool.query(statement,[casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey,id]);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }

    async deleteCases(id:number){
        let statement = `delete from cases where casenumber=$1`;
        try{
            const result = await pool.query(statement,[id]);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }

    async getId(id:number){
        let statement = `select casenumber from cases where casenumber=$1`;
        try{
            const result = await pool.query(statement,[id]);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }

    async validateCasename(casename:string){
        let statement = `select casename from cases where casename=$1`;
        try{
            const result = await pool.query(statement,[casename]);
            return result.rows;
        }
        catch(err)
        {
            return err;
        }
    }
}

module.exports=new CaseDao();