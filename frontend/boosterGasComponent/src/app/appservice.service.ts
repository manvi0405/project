import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  

  constructor(private http: HttpClient) { }

  baseURL: String = 'http://localhost:3000'
  
  getInsights(){
    return this.http.get(this.baseURL+'/api/fetchinsights')
  }

  getContri(){
    return this.http.get(this.baseURL+'/api/fetchContri')
  }

  getAll(){
    // console.log("hiiii")
    return this.http.get(this.baseURL+'/api/fetchAll')
  }



  validateCasename(casename: string){
    console.log("service validate casename")
    return this.http.get(this.baseURL + `/api/validateCasename/${casename}`)
  }

  getId(casename: string){
    console.log("getId sevices")
    return this.http.get(this.baseURL+`/api/fetchId/${casename}`)
  }

  priority(){
    return this.http.get(this.baseURL+`/api/priority`)
  }
 
  contributingpriority(){
    return this.http.get(this.baseURL+'/api/contriPriority')
  }
 
  insights(id: number){
    return this.http.get(this.baseURL+`/api/fetchinsights/${id}`)
  }

  postCases(value: any){
    console.log('post data services')
    return this.http.post(this.baseURL+'/api/postCases', value)
  }

  putCases(id: number, value: any){
    console.log('put data');
    return this.http.put(this.baseURL+`/api/updateCases/${id}`, value)
  }

  deleteCases(id: number){
    console.log("delete data")
    return this.http.delete(this.baseURL+`/api/deleteCases/${id}`)
  }

}
