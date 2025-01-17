import  {CaseDao} from '../dao/caseDao';

export class caseService{
    static async getAllAndContri(){
        try{
            const result = await CaseDao.getAllAndContri();
            return result;
        }
        catch(err){
            throw err;
        }
    }

    // static async getContri(){
    //     try{
    //         const result = await CaseDao.getContri();
    //         return result;
    //     }
    //     catch(err){
    //         throw err;
    //     }
    // }

    static async getInsights(id:number){
        try{
            const result = await CaseDao.getInsights(id) as any;
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async getPriority(){
        try{
            const result = await CaseDao.getPriority() as any;
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async postCases(casename:string,priority:string,type:string,status:string,opendate:string,contributing:string,statuskey:string,co2:number,h2o:number,o2:number,n2:number){
        try{
            const result = await CaseDao.postCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2);
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async updateCases(casename:string,priority:string,type:string,status:string,opendate:string,contributing:string,statuskey:string,co2:number,h2o:number,o2:number,n2:number,id:number){
        try{
            const result = await CaseDao.updateCases(casename,priority,type,status,opendate,contributing,statuskey,co2,h2o,o2,n2,id);
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async deleteCases(id:number){
        try{
            const result = await CaseDao.deleteCases(id);
            return result;
        }
        catch(err){
            console.log(err)
            throw err;
        }
    }
    static async getId(casename:string){
        try{
            const result = await CaseDao.getId(casename);
            return result;
        }
        catch(err){
            throw err;
        }
    }

    static async getCasename(casename:string){
        try{
            const result = await CaseDao.validateCasename(casename);
            return result;
        }
        catch(err){
            throw err;
        }
    }
}