import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AppserviceService {
  tokenValue: any = localStorage.getItem('token')
  headers: any = { 'Authorization': `Bearer ${this.tokenValue}` }
  // apiValueCall(){
  //   console.log('app service');
  //   this.http.get(this.baseURL+`/apiValue`).subscribe((res: any)=>{
  //     this.tokenValue = res.apiValue;
  //   })
  //   this.headers = { 'Authorization': `Bearer ${this.tokenValue}` }
  //   console.log(this.headers)
  // }
  
<<<<<<< HEAD

  constructor(private http: HttpClient) { }

  baseURL: String = 'http://localhost:5000'
=======
  constructor(private http: HttpClient) { 
    // this.apiValueCall()
  }
>>>>>>> f8504b03b114506b9d67b935098f1aa1a849f13c
  
  baseURL: String = 'http://localhost:3000/api/cases'

  getContri(){
    console.log(this.headers)
    return this.http.get(this.baseURL+'/fetchContri', this.headers); 
  }

  getAll(){
    return this.http.get(this.baseURL+'/fetchAll')
  }

  validateCasename(casename: string){
    console.log("service validate casename")
    return this.http.get(this.baseURL + `/validateCasename/${casename}`)
  }

  getId(casename: string){
    console.log("getId sevices")
    return this.http.get(this.baseURL+`/fetchId/${casename}`)
  }

  priority(){
    return this.http.get(this.baseURL+`/priority`)
  }
 
  contributingpriority(){
    return this.http.get(this.baseURL+'/contriPriority')
  }
 
  insights(id: number){
    return this.http.get(this.baseURL+`/fetchinsights/${id}`)
  }

  postCases(value: any){
    console.log('post data services')
    return this.http.post(this.baseURL+'/postCases', value);
  }

  putCases(id: number, value: any){
    console.log('put data');
    return this.http.put(this.baseURL+`/updateCases/${id}`, value)
  }

  deleteCases(id: number){
    console.log("delete data")
    return this.http.delete(this.baseURL+`/deleteCases/${id}`)
  }
}
