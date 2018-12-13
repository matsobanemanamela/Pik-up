import { Injectable } from '@angular/core';
import {LikeTransportModel} from '../pick-up-likes-models/like-transport-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LikeTransportService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedLikeTransportModel : Subject<Array<LikeTransportModel>> = new BehaviorSubject<Array<LikeTransportModel>>([]);
  selectedLikeTransportModel : LikeTransportModel; 
  likeTransportModel : LikeTransportModel;
  LikeTransportModellist : LikeTransportModel[];
  allLikeTransportModellist : LikeTransportModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostLikeTransport(likeTransportModel : LikeTransportModel){
    var body = JSON.stringify(likeTransportModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/LikeTransports', body, requestOptions);
    }

    getallLikeTransport()
    {
      return this.httpClient.get(this.rootUrl+'api/LikeTransports').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the LikeTransport list method///////////////////////////////

      getalltheLikeTransport(){
        return this.http.get(this.rootUrl+'api/LikeTransports').pipe(map((data : Response)=>{
          return data.json() as LikeTransportModel[];
        })).toPromise().then(x => {
          this.LikeTransportModellist = x;
        })
      }
     // get LikeTransport information

    getLikeTransport(){
        return this.http.get(this.rootUrl+'api/GetLikeSkillsTalents?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as LikeTransportModel[];
        })).toPromise().then(x => {
          this.allLikeTransportModellist = x;
        })
    }
    
      getspecifiedLikeTransport(){
        return this.http.get(this.rootUrl+'api/LikeTransports').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedLikeTransportModel.next(data);
        })
      }

      //update LikeTransport

    UpdateLikeTransport(id,likeTransportModel){
        var body = JSON.stringify(likeTransportModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/LikeTransports/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteLikeTransport(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/LikeTransports/'+id).pipe(map((res => res.json())));
      }

}
