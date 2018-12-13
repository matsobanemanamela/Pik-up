import { Injectable } from '@angular/core';
import {ServiceModel} from '../pick-up-models/service-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  readonly rootUrl = "http://localhost:52539/";
  getspecifiedservice : Subject<Array<ServiceModel>> = new BehaviorSubject<Array<ServiceModel>>([]);
  selectedservice : ServiceModel;
  servicemodel : ServiceModel;
  servicelist : ServiceModel[];
  allservicelist : ServiceModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  Postservice(servicemodel : ServiceModel){
   
    var body = JSON.stringify(servicemodel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/Services', body, requestOptions);
    }
  
    getallserv(){
      return this.httpClient.get(this.rootUrl+'api/Services').pipe(map((data:Response)=> data.json()));
    }
    //////// get all the serviecs////////////////////////
      getallService(){
        return this.http.get(this.rootUrl+'api/GeteveryService').pipe(map((data : Response)=>{          
          return data.json() as ServiceModel[];
        })).toPromise().then(x => {
          this.allservicelist = x;
        })
       
      }

     /////// get  all service by id/////////////////
      getService(){
        return this.http.get(this.rootUrl+'api/GetService?id='+localStorage.getItem("CustomerID")).pipe(map((data : Response)=>{          
          return data.json() as ServiceModel[];
        })).toPromise().then(x => {
          this.servicelist = x;
        })
      }
    
      getspecifiedService(){
        return this.http.get(this.rootUrl+'api/Services').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedservice.next(data);
        })
      }
  
      //update  information
  
    Updateservice(id,servicemodel){
        var body = JSON.stringify(servicemodel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/Services/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      //delete information

      DeleteService(id : number)
      {
        return this.http.delete(this.rootUrl +'api/Services/'+id).pipe(map((res => res.json())));
      }
}
