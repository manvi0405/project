// import { TestBed } from '@angular/core/testing';
// import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppserviceService } from './appservice.service';
// import { provideHttpClient } from '@angular/common/http';
// import {contriCases} from './mockData/cases.ts'

describe('AppserviceService', () => {     
  let service: AppserviceService;
  // let httpTesting = TestBed.inject(HttpTestingController);
  let httpClientSpy:any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post:jest.fn(),
      delete:jest.fn(),
      put:jest.fn()
    }
    service = new AppserviceService(httpClientSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); //means the instance of the class is created and is truthy
  });

  // it('should return getall',()=>{
  //   const res = "ruchit";
  //   const url = "http://localhost:3000/api/fetchAll";
  //   jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
  //   service.getAll();
  //   expect(httpClientSpy.get).toBeCalledTimes(1);
  //   expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  // })

  it('should return getall',(done)=>{
    const res = [
      {
        "casename": "case 15",
        "priority": "Medium",
        "type": "General",
        "status": "Open",
        "opendate": "2024-12-05",
        "co2": 14.29,
        "h2o": 28.57,
        "o2": 42.86,
        "n2": 14.29,
        "statuskey": "success",
        "contributing": "contributing"
    },
    {
        "casename": "case 7",
        "priority": "High",
        "type": "General",
        "status": "Open",
        "opendate": "2024-12-25",
        "co2": 26.09,
        "h2o": 45.65,
        "o2": 23.91,
        "n2": 4.35,
        "statuskey": "success",
        "contributing": "contributing"
    },
  ];
    const url = "http://localhost:3000/api/fetchAll";
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.getAll().subscribe(
      {
        next:data=>{
          expect(data).toEqual(res);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.get).toBeCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

  // it('should return getContri',()=>{
  //   const res = "ruchit";
  //   const url = "http://localhost:3000/api/fetchContri";
  //   jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
  //   service.getContri();
  //   expect(httpClientSpy.get).toBeCalledTimes(1);
  //   expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  // })

  it('should return getContri',(done)=>{
    const res = [{
      "casename": "case 15",
      "priority": "Medium",
      "type": "General",
      "status": "Open",
      "opendate": "2024-12-05",
      "co2": 14.29,
      "h2o": 28.57,
      "o2": 42.86,
      "n2": 14.29,
      "statuskey": "success",
      "contributing": "contributing"
  },
  {
      "casename": "case 7",
      "priority": "High",
      "type": "General",
      "status": "Open",
      "opendate": "2024-12-25",
      "co2": 26.09,
      "h2o": 45.65,
      "o2": 23.91,
      "n2": 4.35,
      "statuskey": "success",
      "contributing": "contributing"
  },]
    const url = "http://localhost:3000/api/fetchContri";
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.getContri().subscribe(
      {
        next:data=>{
          expect(data).toEqual(res);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

  // it('should return getinsights',()=>{
  //   const res = "ruchit";
  //   const url = "http://localhost:3000/api/fetchinsights";
  //   jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
  //   service.getInsights();
  //   expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  //   expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  // })

  it('should return getinsights',(done)=>{
    const res = [{
      "casename": "case 15",
      "status": "Open",
      "opendate": "2024-12-05",
      "co2": 14.29,
      "h2o": 28.57,
      "o2": 42.86,
      "n2": 14.29,
     
  },
  {
      "casename": "case 7",
      "status": "Open",
      "opendate": "2024-12-25",
      "co2": 26.09,
      "h2o": 45.65,
      "o2": 23.91,
      "n2": 4.35,

  },]
    const url = "http://localhost:3000/api/fetchinsights";
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.getInsights().subscribe(
      {
        next:data=>{
          expect(data).toEqual(res);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

  it('should test postcases',()=>{
    const command = 'testing';
    const res = "Techopsworld";
    const url = "http://localhost:3000/api/postCases";
    jest.spyOn(httpClientSpy,'post').mockReturnValue(of(res));
    service.postCases(command);
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.post).toHaveBeenCalledWith(url,command);
  })

  it('should test delete cases',(done)=>{
    const id = 3;
    const url = `http://localhost:3000/api/deleteCases/${id}`
    const res = "Deleted Data" 
    jest.spyOn(httpClientSpy,'delete').mockReturnValue(of(res));
    service.deleteCases(id).subscribe(
      {
        next:data=>{
          expect(data).toEqual(res);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.delete).toHaveBeenCalled();
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
  })

  it('should test put cases',(done)=>{
    const id = 5;
    const url = `http://localhost:3000/api/updateCases/${id}`;
    const mockData ={
      "casename": "case 7",
      "priority": "High",
      "type": "General",
      "status": "Open",
      "opendate": "2024-12-25",
      "co2": 26.09,
      "h2o": 45.65,
      "o2": 23.91,
      "n2": 4.35,
      "statuskey": "success",
      "contributing": "contributing"
  }
  const res = "Updated Data"
  jest.spyOn(httpClientSpy,'put').mockReturnValue(of(res));
  service.putCases(id,mockData).subscribe(
    {
      next:data=>{
        expect(data).toEqual(res);
        done();
      },
      error:error =>console.log(error)
    }
  );
  expect(httpClientSpy.put).toHaveBeenCalled();
  expect(httpClientSpy.put).toHaveBeenCalledWith(url,mockData);
  })

  it('should test the priority count',(done)=>{
    const url = 'http://localhost:3000/api/priority';
    const res = [{
      priority: 'Medium',
      count:'2'
    },
    {
      priority: 'High',
      count:'1'
    },
    {
      priority: 'Low',
      count:'1'
    }]

    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.priority().subscribe(
      {
        next:data=>{
          expect(data).toEqual(res);
          done();
        },
        error:error =>console.log(error)
      }
    );

    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);


  })


  it('should test the Contributing priority count',(done)=>{
    const url = 'http://localhost:3000/api/contriPriority';
    const res = [{
      priority: 'Medium',
      count:'2'
    },
    {
      priority: 'High',
      count:'1'
    },
    {
      priority: 'Low',
      count:'1'
    }]

    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));
    service.contributingpriority().subscribe(
      {
        next:data=>{
          expect(data).toEqual(res);
          done();
        },
        error:error =>console.log(error)
      }
    );

    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);


  })



  })
