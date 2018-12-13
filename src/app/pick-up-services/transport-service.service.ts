import { Injectable } from '@angular/core';
import {TransportModel} from '../pick-up-models/transport-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportServiceService {

  readonly rootUrl = "http://localhost:52539/";
  getspecifiedtransport : Subject<Array<TransportModel>> = new BehaviorSubject<Array<TransportModel>>([]);
  selectedtransport : TransportModel;
  transportmodel : TransportModel;
  transportlist : TransportModel[];
  alltransportlist : TransportModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  Posttransport(transportmodel : TransportModel){
    var body = JSON.stringify(transportmodel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/Transports', body, requestOptions);
    }
  
    /////////  get all  the transportation information//////////////
      getallthetransport(){
        return this.http.get(this.rootUrl+'api/GeteveryTransportationdetails').pipe(map((data : Response)=>{
          return data.json() as TransportModel[];
        })).toPromise().then(x => {
          this.alltransportlist = x;
        })
        
      }
  ///// get all transportation information by id ////////////////
      gettransport(){
        return this.http.get(this.rootUrl+'api/GetTransportationdetails?id='+localStorage.getItem("CustomerID")).pipe(map((data : Response)=>{
          return data.json() as TransportModel[];
        })).toPromise().then(x => {
          this.transportlist = x;
        })
      }
    
      getspecifiedtransportss(){
        return this.http.get(this.rootUrl+'api/Transports').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedtransport.next(data);
        })
      }
  
      //update information
  
    Updatetransport(id,transportmodel){
        var body = JSON.stringify(transportmodel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/Transports/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

// delete information

DeleteProduct(id : number)
{
  return this.http.delete(this.rootUrl +'api/Transports/'+id).pipe(map((res => res.json())));
}

}
