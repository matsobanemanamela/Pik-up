import { Injectable } from '@angular/core';
import {CommentTransportModel} from '../pick-up-comment-models/comment-transport-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentTransportService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedCommentTransportModel : Subject<Array<CommentTransportModel>> = new BehaviorSubject<Array<CommentTransportModel>>([]);
  selectedCommentTransportModel : CommentTransportModel; 
  commentTransportModel : CommentTransportModel;
  commentTransportModellist : CommentTransportModel[];
  allCommentTransportModellist : CommentTransportModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostCommentTransport(commentTransportModel : CommentTransportModel){
    var body = JSON.stringify(commentTransportModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/CommentTransports', body, requestOptions);
    }

    getallCommentTransport()
    {
      return this.httpClient.get(this.rootUrl+'api/CommentTransports').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the CommentTransport list method///////////////////////////////
      getalltheCommentTransport(){
        return this.http.get(this.rootUrl+'api/CommentTransports').pipe(map((data : Response)=>{
          return data.json() as CommentTransportModel[];
        })).toPromise().then(x => {
          this.commentTransportModellist = x;
        })
      }
     // get CommentTransport information
      getCommentTransport(){
        return this.http.get(this.rootUrl+'api/GetCommentTransports?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as CommentTransportModel[];
        })).toPromise().then(x => {
          this.allCommentTransportModellist = x;
        })
      }
    
      getspecifiedCommentTransport(){
        return this.http.get(this.rootUrl+'api/CommentTransports').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedCommentTransportModel.next(data);
        })
      }

      //update CommentTransport

    UpdateCommentTransport(id,commentTransportModel){
        var body = JSON.stringify(commentTransportModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/CommentTransports/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteCommentTransport(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/CommentTransports/'+id).pipe(map((res => res.json())));
      }

}
