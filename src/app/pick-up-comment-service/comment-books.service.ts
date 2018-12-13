import { Injectable } from '@angular/core';
import {CommentBooksModel} from '../pick-up-comment-models/comment-books-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentBooksService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedCommentBooksModel : Subject<Array<CommentBooksModel>> = new BehaviorSubject<Array<CommentBooksModel>>([]);
  selectedCommentBooksModel : CommentBooksModel; 
  commentBooksModel : CommentBooksModel;
  commentCommentBooksModellist : CommentBooksModel[];
  allCommentBooksModellist : CommentBooksModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostCommentBooks(commentBooksModel : CommentBooksModel){
    var body = JSON.stringify(commentBooksModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/CommentBooks', body, requestOptions);
    }

    getallCommentBooks()
    {
      return this.httpClient.get(this.rootUrl+'api/Accommodations').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the CommentBooksModel list method///////////////////////////////
      getalltheCommentBooks(){
        return this.http.get(this.rootUrl+'api/CommentBooks').pipe(map((data : Response)=>{
          return data.json() as CommentBooksModel[];
        })).toPromise().then(x => {
          this.allCommentBooksModellist = x;
        })
      }
     // get CommentBooksModel information
      getCommentBooks(){
        return this.http.get(this.rootUrl+'api/GetCommentBooks?id='+localStorage.getItem("commenbooki")).pipe(map((data : Response)=>{
          return data.json() as CommentBooksModel[];
        })).toPromise().then(x => {
          this.commentCommentBooksModellist = x;
        })
      }
    
      getspecifiedCommentBooks(){
        return this.http.get(this.rootUrl+'api/CommentBooks').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedCommentBooksModel.next(data);
        })
      }

      //update CommentBooksModel

    UpdateCommentBooks(id,commentBooksModel){
        var body = JSON.stringify(commentBooksModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/CommentBooks/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteCommentBooks(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/CommentBooks/'+id).pipe(map((res => res.json())));
      }
}
