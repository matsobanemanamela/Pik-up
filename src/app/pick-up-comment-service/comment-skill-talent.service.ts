import { Injectable } from '@angular/core';
import {CommentSkillsAndTalentModel} from '../pick-up-comment-models/comment-skills-and-talent-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentSkillTalentService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedCommentSkillsAndTalentModel : Subject<Array<CommentSkillsAndTalentModel>> = new BehaviorSubject<Array<CommentSkillsAndTalentModel>>([]);
  selectedCommentSkillsAndTalentModel : CommentSkillsAndTalentModel; 
  commentSkillsAndTalentModel : CommentSkillsAndTalentModel;
  CommentSkillsAndTalentModellist : CommentSkillsAndTalentModel[];
  allCommentSkillsAndTalentModellist : CommentSkillsAndTalentModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostcommentSkillsAndTalent(commentSkillsAndTalentModel : CommentSkillsAndTalentModel){
    var body = JSON.stringify(commentSkillsAndTalentModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/CommentSkillTalents', body, requestOptions);
    }

    getallcommentSkillsAndTalent()
    {
      return this.httpClient.get(this.rootUrl+'api/CommentSkillTalents').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the commentSkillsAndTalent list method///////////////////////////////
      getallthecommentSkillsAndTalent(){
        return this.http.get(this.rootUrl+'api/CommentSkillTalents').pipe(map((data : Response)=>{
          return data.json() as CommentSkillsAndTalentModel[];
        })).toPromise().then(x => {
          this.CommentSkillsAndTalentModellist = x;
        })
      }
     // get commentSkillsAndTalent information
      getcommentSkillsAndTalent(){
        return this.http.get(this.rootUrl+'api/GetCommentSkillTalents?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as CommentSkillsAndTalentModel[];
        })).toPromise().then(x => {
          this.allCommentSkillsAndTalentModellist = x;
        })
      }
    
      getspecifiedcommentSkillsAndTalent(){
        return this.http.get(this.rootUrl+'api/CommentSkillTalents').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedCommentSkillsAndTalentModel.next(data);
        })
      }

      //update commentSkillsAndTalent

    UpdatecommentSkillsAndTalent(id,commentSkillsAndTalentModel){
        var body = JSON.stringify(commentSkillsAndTalentModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/CommentSkillTalents/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeletecommentSkillsAndTalent(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/CommentSkillTalents/'+id).pipe(map((res => res.json())));
      }
}
