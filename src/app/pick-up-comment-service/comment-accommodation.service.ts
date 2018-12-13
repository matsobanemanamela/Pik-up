import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client';
import {CommentAccommodationModel} from '../pick-up-comment-models/comment-accommodation-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentAccommodationService {
  readonly rootUrl = "http://localhost:52539/";
  getspecifiedcommentaccommodation : Subject<Array<CommentAccommodationModel>> = new BehaviorSubject<Array<CommentAccommodationModel>>([]);
  selectedcommentAccommodationModel : CommentAccommodationModel; 
  commentAccommodationModel : CommentAccommodationModel;
  commentAccommodationModellist : CommentAccommodationModel[];
  commentAccommodationModelCountlist : CommentAccommodationModel[];

  // private socket = io('http://localhost:5000');
  constructor( private http : Http, private httpClient : HttpClient) { }

  PostCommentAccommodation(commentAccommodationModel : CommentAccommodationModel){
    var body = JSON.stringify(commentAccommodationModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/CommentAccommodations', body, requestOptions);
    }

    getallCommentAccommodation()
    {
      return this.httpClient.get(this.rootUrl+'api/CommentAccommodations').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the books list method///////////////////////////////
      getalltheCommentAccommodation(id : number){
        return this.http.get(this.rootUrl+'api/GetCommentAccommodationsCount?id='+id).pipe(map((data : Response)=>{
          return data.json() as CommentAccommodationModel[];
        })).toPromise().then(x => {
          this.commentAccommodationModelCountlist = x;
        })
      }
     // get user information
      getCommentAccommodation(){
        return this.http.get(this.rootUrl+'api/GetCommentAccommodations?id='+localStorage.getItem("example1")).pipe(map((data : Response)=>{
          return data.json() as CommentAccommodationModel[];
        })).toPromise().then(x => {
          this.commentAccommodationModellist = x;
        })
      }
    
      getspecifiedCommentAccommodation(){
        return this.http.get(this.rootUrl+'api/CommentAccommodations').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedcommentaccommodation.next(data);
        })
      }

      //update user profile

    UpdateCommentAccommodation(id,commentAccommodationModel){
        var body = JSON.stringify(commentAccommodationModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/CommentAccommodations/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteCommentAccommodation(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/CommentAccommodations/'+id).pipe(map((res => res.json())));
      }

}
