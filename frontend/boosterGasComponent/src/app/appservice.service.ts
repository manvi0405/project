import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AppserviceService {
  tokenValue: any = localStorage.getItem('token')
  headers: any = { 'Authorization': `Bearer ${this.tokenValue}` }

  constructor(private http: HttpClient) { 

  }
  
  baseURL: String = 'http://localhost:3000/api/cases'

  // getContri(){
  //   console.log(this.headers)
  //   return this.http.get(this.baseURL+'/fetchContri',{'headers':this.headers} ); 
  // }

  getAllAndContri(){
    return this.http.get(this.baseURL+'/fetchAll',{'headers':this.headers})
  }

  validateCasename(casename: string){
    console.log("service validate casename")
    return this.http.get(this.baseURL + `/validateCasename/${casename}`,{'headers':this.headers})
  }

  getId(casename: string){
    console.log("getId sevices")
    return this.http.get(this.baseURL+`/fetchId/${casename}`,{'headers':this.headers})
  }

  priority(){
    return this.http.get(this.baseURL+`/priority`,{'headers':this.headers})
  }
 
 
  insights(id: number){
    return this.http.get(this.baseURL+`/fetchinsights/${id}`,{'headers':this.headers})
  }

  postCases(value: any){
    console.log('post data services')
    return this.http.post(this.baseURL+'/postCases', value,{'headers':this.headers});
  }

  putCases(id: number, value: any){
    console.log('put data');
    return this.http.put(this.baseURL+`/updateCases/${id}`, value,{'headers':this.headers})
  }

  deleteCases(id: number){
    console.log("delete data")
    return this.http.delete(this.baseURL+`/deleteCases/${id}`,{'headers':this.headers})
  }
}
