import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';
import {TalentAndSkillsModel} from '../pick-up-models/talent-and-skills-model';

@Injectable({
  providedIn: 'root'
})
export class SkillsAndTalentServiceService {

  readonly rootUrl = "http://localhost:52539/";
  getspecifiedTalent : Subject<Array<TalentAndSkillsModel>> = new BehaviorSubject<Array<TalentAndSkillsModel>>([]);
  talentandskillmodel : TalentAndSkillsModel;
  selectedtalentandskillmodel : TalentAndSkillsModel;
  talentandskillmodelList : TalentAndSkillsModel[];
  AlltalentandskillmodelList : TalentAndSkillsModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }
  
  Posttalentandskill(talentandskillmodel : TalentAndSkillsModel){
    var body = JSON.stringify(talentandskillmodel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/SkillsTalents', body, requestOptions);
    }
  
    getskills(){
      return this.httpClient.get(this.rootUrl+'api/SkillsTalents').pipe(map((data:Response)=> data.json()));
    }
   ////////// get all the talent and skill information.////////////// 
      getallthetalentandskill(){
        return this.http.get(this.rootUrl+'api/GeteverySkillsTalent').pipe(map((data : Response)=>{
          return data.json() as TalentAndSkillsModel[];
        })).toPromise().then(x => {
          this.AlltalentandskillmodelList = x;
        })
      }
     ///// get all skills and talent information by id ////////////////
      gettalentandskill(){
        return this.http.get(this.rootUrl+'api/GetSkillsTalent?id='+localStorage.getItem("CustomerID")).pipe(map((data : Response)=>{
          return data.json() as TalentAndSkillsModel[];
        })).toPromise().then(x => {
          this.talentandskillmodelList = x;
        })
      }
    
      getspecifiedtalentandskill(){
        return this.http.get(this.rootUrl+'api/SkillsTalents').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedTalent.next(data);
        })
      }
  
      //update user profile
  
    Updatetalentandskill(id,talentandskillmodel){
        var body = JSON.stringify(talentandskillmodel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/SkillsTalents/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }
  
      Deletetalentandskill(id : number)
      {
        return this.http.delete(this.rootUrl +'api/SkillsTalents/'+id).pipe(map((res => res.json())));
      }
}
