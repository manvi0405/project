import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppserviceService } from './appservice.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
// import {contriCases} from './mockData/cases.ts'

describe('AppserviceService', () => { 
  let service: AppserviceService;
  // const httpTesting = TestBed.inject(HttpTestingController);
  let httpClientSpy: any;

  beforeEach(() => {//runs befor every it() which is called a spec
    httpClientSpy = {
      get: jest.fn(), //create a mock function for the get call (api of http client and not the function name)
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn()
    }
    service = new AppserviceService(httpClientSpy);  
    // TestBed.configureTestingModule({
    //   providers: [provideHttpClient(), provideHttpClientTesting()] //used to import service dependencies
    });
    
    // service = TestBed.inject(AppserviceService)
    // const fixture = TestBed.createComponent(AppserviceService);
    // const app = fixture.debugElement.componentInstance;
    // expect(app.title).toEqual('');


    it('should be created', () => { //this is a spec which contains many expectations
      console.log("test case 1")
      expect(service).toBeTruthy(); //means the instance of the class is created and is truthy
    });

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
    
  //we define the response to be returned and if it is returned the api is tested
    it('should return getall',(done)=>{
      const url = "http://localhost:3000/api/fetchAll";
      jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res)); //of() is used to convert the response into an observable as the api responds with an observable
      service.getAll().subscribe(
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

    it('should return getcontri',(done)=>{
      const url = "http://localhost:3000/api/fetchContri";
      jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res)); //of() is used to convert the response into an observable as the api responds with an observable
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

    it('should return getinsights',(done)=>{
      const result = [
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
    ]
      const id = 3;
      const url = `http://localhost:3000/api/fetchinsights/${id}`;
      jest.spyOn(httpClientSpy,'get').mockReturnValue(of(result)); //of() is used to convert the response into an observable as the api responds with an observable
      service.insights(id).subscribe(
        {
          next:data=>{
            expect(data).toEqual(result);
            done();
          },
          error:error =>console.log(error)
        }
      );
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    })
   
    it('should return getid',(done)=>{
      let casename = 'case 3'
      const result = [{"casename": "case 15", "co2": 14.29, "contributing": "contributing", "h2o": 28.57, "n2": 14.29, "o2": 42.86, "opendate": "2024-12-05", "priority": "Medium", "status": "Open", "statuskey": "success", "type": "General"}, {"casename": "case 7", "co2": 26.09, "contributing": "contributing", "h2o": 45.65, "n2": 4.35, "o2": 23.91, "opendate": "2024-12-25", "priority": "High", "status": "Open", "statuskey": "success", "type": "General"}]
      const url = `http://localhost:3000/api/fetchId/${casename}`;

      jest.spyOn(httpClientSpy,'get').mockReturnValue(of(result)); //of() is used to convert the response into an observable as the api responds with an observable
      service.getId(casename).subscribe(
        {
          next:data=>{
            expect(data).toEqual(result);
            done();
          },
          error:error =>console.log(error)
        }
      );
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.get).toHaveBeenCalledWith(url);
    })

    it("should validateCasename", (done)=>{
      let casename = "case 3"
      const url = `http://localhost:3000/api/validateCasename/${casename}`;
      let result = {
        "command": "SELECT",
        "rowCount": 1,
        "oid": null,
        "rows": [
            {
                "casename": "case 3"
            }
        ],
        "fields": [
            {
                "name": "casename",
                "tableID": 16422,
                "columnID": 18,
                "dataTypeID": 1043,
                "dataTypeSize": -1,
                "dataTypeModifier": -1,
                "format": "text"
            }
        ],
        "_parsers": [
            null
        ],
        "_types": {
            "_types": {
                "arrayParser": {},
                "builtins": {
                    "BOOL": 16,
                    "BYTEA": 17,
                    "CHAR": 18,
                    "INT8": 20,
                    "INT2": 21,
                    "INT4": 23,
                    "REGPROC": 24,
                    "TEXT": 25,
                    "OID": 26,
                    "TID": 27,
                    "XID": 28,
                    "CID": 29,
                    "JSON": 114,
                    "XML": 142,
                    "PG_NODE_TREE": 194,
                    "SMGR": 210,
                    "PATH": 602,
                    "POLYGON": 604,
                    "CIDR": 650,
                    "FLOAT4": 700,
                    "FLOAT8": 701,
                    "ABSTIME": 702,
                    "RELTIME": 703,
                    "TINTERVAL": 704,
                    "CIRCLE": 718,
                    "MACADDR8": 774,
                    "MONEY": 790,
                    "MACADDR": 829,
                    "INET": 869,
                    "ACLITEM": 1033,
                    "BPCHAR": 1042,
                    "VARCHAR": 1043,
                    "DATE": 1082,
                    "TIME": 1083,
                    "TIMESTAMP": 1114,
                    "TIMESTAMPTZ": 1184,
                    "INTERVAL": 1186,
                    "TIMETZ": 1266,
                    "BIT": 1560,
                    "VARBIT": 1562,
                    "NUMERIC": 1700,
                    "REFCURSOR": 1790,
                    "REGPROCEDURE": 2202,
                    "REGOPER": 2203,
                    "REGOPERATOR": 2204,
                    "REGCLASS": 2205,
                    "REGTYPE": 2206,
                    "UUID": 2950,
                    "TXID_SNAPSHOT": 2970,
                    "PG_LSN": 3220,
                    "PG_NDISTINCT": 3361,
                    "PG_DEPENDENCIES": 3402,
                    "TSVECTOR": 3614,
                    "TSQUERY": 3615,
                    "GTSVECTOR": 3642,
                    "REGCONFIG": 3734,
                    "REGDICTIONARY": 3769,
                    "JSONB": 3802,
                    "REGNAMESPACE": 4089,
                    "REGROLE": 4096
                }
            },
            "text": {},
            "binary": {}
        },
        "RowCtor": null,
        "rowAsArray": false,
        "_prebuiltEmptyResultObject": {
            "casename": null
        }
    }
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(result));
    service.validateCasename(casename).subscribe(
      {
        next:data=>{
          expect(data).toEqual(result);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  })

    it('should test postcases',(done)=>{
      const command = {  
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
    }; //post this
      const res = "Posted Data";
      const url = "http://localhost:3000/api/postCases";
      jest.spyOn(httpClientSpy,'post').mockReturnValue(of(res));
      service.postCases(command).subscribe(
        {
          next:data=>{
            expect(data).toEqual(res);
            done();
          },
          error:error =>console.log(error)
        }
      );
      expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
      expect(httpClientSpy.post).toHaveBeenCalledWith(url,command);
    })

    it("should test putCases", (done)=>{
      const command = {  
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
    };//put this
    const id = 10;
    const result = "Updated Data"
    const url = `http://localhost:3000/api/updateCases/${id}`

    jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(result))
    service.putCases(id, command).subscribe(
      {
        next:data=>{
          console.log("data: ",data);
          expect(data).toEqual(result);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.put).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.put).toHaveBeenCalledWith(url,command);
  })

  it('should test delete cases',(done)=>{
    const id = 3;
    const url = `http://localhost:3000/api/deleteCases/${id}`
    const result = "Deleted Data"
    jest.spyOn(httpClientSpy,'delete').mockReturnValue(of(result));
    service.deleteCases(id).subscribe(
      {
        next:data=>{
          console.log("data: ",data);
          expect(data).toEqual(result);
          done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientSpy.delete).toHaveBeenCalled();
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
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
});

  

  

