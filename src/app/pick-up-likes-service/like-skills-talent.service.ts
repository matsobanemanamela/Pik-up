import { Injectable } from '@angular/core';
import {LikeSkillsTalentModel} from '../pick-up-likes-models/like-skills-talent-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeSkillsTalentService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedLikeSkillsTalentModel : Subject<Array<LikeSkillsTalentModel>> = new BehaviorSubject<Array<LikeSkillsTalentModel>>([]);
  selectedLikeSkillsTalentModel : LikeSkillsTalentModel; 
  likeSkillsTalentModel : LikeSkillsTalentModel;
  LikeSkillsTalentModellist : LikeSkillsTalentModel[];
  allLikeSkillsTalentModellist : LikeSkillsTalentModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostLikeSkillsTalent(likeSkillsTalentModel : LikeSkillsTalentModel){
    var body = JSON.stringify(likeSkillsTalentModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/LikeSkillsTalents', body, requestOptions);
    }

    getallLikeSkillsTalent()
    {
      return this.httpClient.get(this.rootUrl+'api/LikeSkillsTalents').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the LikeProduct list method///////////////////////////////

      getalltheLikeSkillsTalent(){
        return this.http.get(this.rootUrl+'api/LikeSkillsTalents').pipe(map((data : Response)=>{
          return data.json() as LikeSkillsTalentModel[];
        })).toPromise().then(x => {
          this.LikeSkillsTalentModellist = x;
        })
      }
     // get LikeProduct information

    getLikeSkillsTalent(){
        return this.http.get(this.rootUrl+'api/GetLikeSkillsTalents?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as LikeSkillsTalentModel[];
        })).toPromise().then(x => {
          this.allLikeSkillsTalentModellist = x;
        })
    }
    
      getspecifiedLikeSkillsTalent(){
        return this.http.get(this.rootUrl+'api/LikeSkillsTalents').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedLikeSkillsTalentModel.next(data);
        })
      }

      //update LikeProduct

    UpdateLikeSkillsTalent(id,likeSkillsTalentModel){
        var body = JSON.stringify(likeSkillsTalentModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/LikeSkillsTalents/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteLikeSkillsTalent(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/LikeSkillsTalents/'+id).pipe(map((res => res.json())));
      }

}
