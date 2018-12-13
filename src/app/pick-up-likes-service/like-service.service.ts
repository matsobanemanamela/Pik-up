import { Injectable } from '@angular/core';
import {LikeServiceModel} from '../pick-up-likes-models/like-service-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeServiceService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedLikeServiceModel : Subject<Array<LikeServiceModel>> = new BehaviorSubject<Array<LikeServiceModel>>([]);
  selectedLikeServiceModel : LikeServiceModel; 
  likeServiceModel : LikeServiceModel;
  LikeServiceModellist : LikeServiceModel[];
  allLikeServiceModellist : LikeServiceModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }
  
  PostLikeService(likeServiceModel : LikeServiceModel){
    var body = JSON.stringify(likeServiceModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/LikeServices', body, requestOptions);
    }

    getallLikeService()
    {
      return this.httpClient.get(this.rootUrl+'api/LikeServices').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the LikeProduct list method///////////////////////////////

      getalltheLikeService(){
        return this.http.get(this.rootUrl+'api/LikeServices').pipe(map((data : Response)=>{
          return data.json() as LikeServiceModel[];
        })).toPromise().then(x => {
          this.LikeServiceModellist = x;
        })
      }
     // get LikeProduct information

    getLikeService(){
        return this.http.get(this.rootUrl+'api/GetLikeServices?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as LikeServiceModel[];
        })).toPromise().then(x => {
          this.allLikeServiceModellist = x;
        })
    }
    
      getspecifiedLikeService(){
        return this.http.get(this.rootUrl+'api/LikeServices').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedLikeServiceModel.next(data);
        })
      }

      //update LikeProduct

    UpdateLikeService(id,likeServiceModel){
        var body = JSON.stringify(likeServiceModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/LikeServices/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteLikeService(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/LikeServices/'+id).pipe(map((res => res.json())));
      }

}
