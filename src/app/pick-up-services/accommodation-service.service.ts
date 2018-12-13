import { Injectable } from '@angular/core';
import {AccommodationModel} from '../pick-up-models/accommodation-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccommodationServiceService {
  readonly rootUrl = "http://localhost:52539/";
  
  getspecifiedaccommodation : Subject<Array<AccommodationModel>> = new BehaviorSubject<Array<AccommodationModel>>([]);
  accomodationmodel : AccommodationModel;
  selectedAccommodation : AccommodationModel;
  accommodationList : AccommodationModel[];
  allaccommodationList : AccommodationModel[];
  everyaccommodationList : AccommodationModel[];


  constructor(private http : Http, private httpClient : HttpClient) { }

//enter Accommodations information to the db  
  PostAccommodation(accomodationmodel : AccommodationModel){
    var body = JSON.stringify(accomodationmodel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/Accommodations', body, requestOptions);
    }

         // get Accommodation information
      getalltheAccommodation(){
        return this.httpClient.get(this.rootUrl+'api/Accommodations').pipe(map((data:Response)=> data.json()));
      }
//////////////////GET ALL BY CUSTOMER id/////////////////////////////////////
      getAccommodation(){
        return this.http.get(this.rootUrl+'api/GetAccommodation?id='+localStorage.getItem("CustomerID")).pipe(map((data : Response)=>{
          return data.json() as AccommodationModel[];
        })).toPromise().then(x => {
          this.accommodationList = x;
        })
      }
 //////////////////////////GET ALL THE ACCOMMODATION////////////////////////////////////////
 getALLTHEAccommodation(){
  return this.http.get(this.rootUrl+'GetAccommodationlist').pipe(map((data : Response)=>{
    return data.json() as AccommodationModel[];
  })).toPromise().then(x => {
    this.everyaccommodationList = x;
  })
}
////// it is for advertisement dont forget ////////////////////////////////////////////////////////////
      getAllAccommodationList(){
        return this.http.get(this.rootUrl+'api/GetAccommodation?id=1').pipe(map((data : Response)=>{
          return data.json() as AccommodationModel[];
        })).toPromise().then(x => {
          this.allaccommodationList = x;
        })
      }
/////////////////////////////////////////////////////////////////////    ///////
      getspecifiedAccommodation(){
        return this.http.get(this.rootUrl+'api/Accommodations').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedaccommodation.next(data);
        })
      }

      //update Accommodation information

    UpdateAccommodation(id,accomodationmodel){
        var body = JSON.stringify(accomodationmodel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/Accommodations/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

    //delete Accommodations information
      DeleteAccommodation(id : number)
      {
        return this.http.delete(this.rootUrl+'api/Accommodations/'+id).pipe(map((res => res.json())));
      }
}
