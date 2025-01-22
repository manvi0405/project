import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AppserviceService {
  tokenValue: any = localStorage.getItem('token')
  headers: any = { 'Authorization': `Bearer ${this.tokenValue}` }
<<<<<<< HEAD
  // apiValueCall(){
  //   console.log('app service');
  //   this.http.get(this.baseURL+`/apiValue`).subscribe((res: any)=>{
  //     this.tokenValue = res.apiValue;
  //   })
  //   this.headers = { 'Authorization': `Bearer ${this.tokenValue}` }
  //   console.log(this.headers)
  // }
  
=======

>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  constructor(private http: HttpClient) { 

  }
  
  baseURL: String = 'http://localhost:3000/api/cases'

  // getContri(){
  //   console.log(this.headers)
<<<<<<< HEAD
  //   return this.http.get(this.baseURL+'/fetchContri', {'headers': this.headers}); 
  // }

  getAllAndContri(){
    return this.http.get(this.baseURL+'/fetchAll', {'headers': this.headers})
=======
  //   return this.http.get(this.baseURL+'/fetchContri',{'headers':this.headers} ); 
  // }

  getAllAndContri(){
    return this.http.get(this.baseURL+'/fetchAll',{'headers':this.headers})
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  }

  validateCasename(casename: string){
    console.log("service validate casename")
<<<<<<< HEAD
    return this.http.get(this.baseURL + `/validateCasename/${casename}`, {'headers': this.headers})
=======
    return this.http.get(this.baseURL + `/validateCasename/${casename}`,{'headers':this.headers})
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  }

  getId(casename: string){
    console.log("getId sevices")
<<<<<<< HEAD
    return this.http.get(this.baseURL+`/fetchId/${casename}`, {'headers': this.headers})
  }

  priority(){
    return this.http.get(this.baseURL+`/priority`, {'headers': this.headers})
  }
 
  contributingpriority(){
    return this.http.get(this.baseURL+'/contriPriority', {'headers': this.headers})
  }
 
  insights(id: number){
    return this.http.get(this.baseURL+`/fetchinsights/${id}`, {'headers': this.headers})
=======
    return this.http.get(this.baseURL+`/fetchId/${casename}`,{'headers':this.headers})
  }

  priority(){
    return this.http.get(this.baseURL+`/priority`,{'headers':this.headers})
  }
 
 
  insights(id: number){
    return this.http.get(this.baseURL+`/fetchinsights/${id}`,{'headers':this.headers})
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  }

  postCases(value: any){
    console.log('post data services')
<<<<<<< HEAD
    return this.http.post(this.baseURL+'/postCases', value, {'headers': this.headers});
=======
    return this.http.post(this.baseURL+'/postCases', value,{'headers':this.headers});
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  }

  putCases(id: number, value: any){
    console.log('put data');
<<<<<<< HEAD
    return this.http.put(this.baseURL+`/updateCases/${id}`, value, {'headers': this.headers})
=======
    return this.http.put(this.baseURL+`/updateCases/${id}`, value,{'headers':this.headers})
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  }

  deleteCases(id: number){
    console.log("delete data")
<<<<<<< HEAD
    return this.http.delete(this.baseURL+`/deleteCases/${id}`, {'headers': this.headers})
=======
    return this.http.delete(this.baseURL+`/deleteCases/${id}`,{'headers':this.headers})
>>>>>>> 73282603882894501fed6c2f202755a6ba940eb8
  }
}
