import pool from "../db/database";

export class CaseDao{
    static async getAllAndContri(){
        let statement = `SELECT casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing,CASE WHEN contributing = 'contributing' THEN 'contributing' ELSE 'all' END AS casetype
        FROM cases ORDER BY casenumber DESC;
    `;
        try
        {
            const result = await pool.query(statement);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }
    
    // static async getContri()
    // {
    //     let statement = `select casename,priority,type,status,opendate,co2,h2o,o2,n2,statuskey,contributing from cases where contributing = 'contributing' order by casenumber desc; `;
    //     try
    //     {
    //         const result = await pool.query(statement);
    //         return result.rows;
    //     }
    //     catch(err){
    //         return err;
    //     }
    // }   

    static async getInsights(id: number)
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

    static async getPriority()
    {
        let statement = `SELECT  priority, COUNT(*) AS total_count,SUM(CASE WHEN contributing = 'contributing' THEN 1 ELSE 0 END) AS contributing_count
    FROM  cases GROUP BY  priority;`;
        try{
            const result = await pool.query(statement);
            console.log(result.rows)
            return result.rows;

        }
        catch(err)
        {return err}
    }
    
    
    static async postCases(casename:string,priority:string,type:string,status:string,opendate:string,contributing:string,statuskey:string,co2:number,h2o:number,o2:number,n2:number){
        let statement = `insert into cases(casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`;
        try{
            const result = await pool.query(statement,[casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey]);
            console.log(result)
            return result.rows;
        }
        catch(err){
            console.log(err)
            return err;
        }
    }

    static async updateCases(casename:string,priority:string,type:string,status:string,opendate:string,contributing:string,statuskey:string,co2:number,h2o:number,o2:number,n2:number,id:number){
        let statement = `update cases set casename=$1,priority=$2,type=$3,status=$4,opendate=$5,co2=$6,h2o=$7,o2=$8,n2=$9,contributing=$10,statuskey=$11 where casenumber=$12`;
        try{
            const result = await pool.query(statement,[casename,priority,type,status,opendate,co2,h2o,o2,n2,contributing,statuskey,id]);
            return result.rows;
        }
        catch(err){
            return err;
        }
    }

    static async deleteCases(id:number){
        let statement = `delete from cases where casenumber=$1`;
        try{
            const result = await pool.query(statement,[id]);
            return result.rows;
        }
        catch(err){
            console.log(err)
            return err;
        }
    }

    static async getId(casename:string){
        let statement = `select casenumber from cases where (casename='${casename}');`;
        try{
            const result = await pool.query(statement);
            return result.rows;
        }
        catch(err){
            console.log(err)
            return err;
        }
    }

    static  async validateCasename(casename:string){
        let statement = `select casename from cases where casename=$1;`;
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
