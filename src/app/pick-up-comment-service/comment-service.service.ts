import { Injectable } from '@angular/core';
import {CommentServiceModel} from '../pick-up-comment-models/comment-service-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedCommentServiceModel : Subject<Array<CommentServiceModel>> = new BehaviorSubject<Array<CommentServiceModel>>([]);
  selectedCommentServiceModel : CommentServiceModel; 
  commentServiceModel : CommentServiceModel;
  CommentServiceModellist : CommentServiceModel[];
  allCommentServiceModellist : CommentServiceModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostCommentService(commentServiceModel : CommentServiceModel){
    var body = JSON.stringify(commentServiceModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/CommentServices', body, requestOptions);
    }

    getallCommentService()
    {
      return this.httpClient.get(this.rootUrl+'api/CommentServices').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the CommentService list method///////////////////////////////
      getalltheCommentService(){
        return this.http.get(this.rootUrl+'api/CommentServices').pipe(map((data : Response)=>{
          return data.json() as CommentServiceModel[];
        })).toPromise().then(x => {
          this.CommentServiceModellist = x;
        })
      }
     // get CommentService information
      getCommentService(){
        return this.http.get(this.rootUrl+'api/GetCommentServices?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as CommentServiceModel[];
        })).toPromise().then(x => {
          this.allCommentServiceModellist = x;
        })
      }
    
      getspecifiedCommentService(){
        return this.http.get(this.rootUrl+'api/CommentServices').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedCommentServiceModel.next(data);
        })
      }

      //update CommentService

    UpdateCommentService(id,commentServiceModel){
        var body = JSON.stringify(commentServiceModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/CommentServices/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteCommentService(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/CommentServices/'+id).pipe(map((res => res.json())));
      }
}
