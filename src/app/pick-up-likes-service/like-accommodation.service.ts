import { Injectable } from '@angular/core';
import {LikeAccommodationModel} from '../pick-up-likes-models/like-accommodation-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeAccommodationService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedLikeAccommodationModel : Subject<Array<LikeAccommodationModel>> = new BehaviorSubject<Array<LikeAccommodationModel>>([]);
  selectedLikeAccommodationModel : LikeAccommodationModel; 
  likeAccommodationModel : LikeAccommodationModel;
  LikeAccommodationModellist : LikeAccommodationModel[];
  allLikeAccommodationModellist : LikeAccommodationModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }
  
  PostLikeAccommodation(likeAccommodationModel : LikeAccommodationModel){
    var body = JSON.stringify(likeAccommodationModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/LikeAccommodations', body, requestOptions);
    }

    getallLikeAccommodation()
    {
      return this.httpClient.get(this.rootUrl+'api/LikeAccommodations').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the LikeAccommodation list method///////////////////////////////
      getalltheLikeAccommodation(){
        return this.http.get(this.rootUrl+'api/LikeAccommodations').pipe(map((data : Response)=>{
          return data.json() as LikeAccommodationModel[];
        })).toPromise().then(x => {
          this.LikeAccommodationModellist = x;
        })
      }
     // get LikeAccommodation information
      getLikeAccommodation(){
        return this.http.get(this.rootUrl+'api/GetLikeAccommodations?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as LikeAccommodationModel[];
        })).toPromise().then(x => {
          this.allLikeAccommodationModellist = x;
        })
      }
    
      getspecifiedLikeAccommodation(){
        return this.http.get(this.rootUrl+'api/LikeAccommodations').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedLikeAccommodationModel.next(data);
        })
      }

      //update LikeAccommodation

    UpdateLikeAccommodation(id,likeAccommodationModel){
        var body = JSON.stringify(likeAccommodationModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/LikeAccommodations/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteLikeAccommodation(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/LikeAccommodations/'+id).pipe(map((res => res.json())));
      }

}
