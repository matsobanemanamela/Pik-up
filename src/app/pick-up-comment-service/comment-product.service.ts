import { Injectable } from '@angular/core';
import {CommentProductModel} from '../pick-up-comment-models/comment-product-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentProductService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedCommentProductModel : Subject<Array<CommentProductModel>> = new BehaviorSubject<Array<CommentProductModel>>([]);
  selectedCommentProductModel : CommentProductModel; 
  commentProductModel : CommentProductModel;
  CommentProductModellist : CommentProductModel[];
  allCommentProductModellist : CommentProductModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostCommentProduct(commentProductModel : CommentProductModel){
    var body = JSON.stringify(commentProductModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/CommentProducts', body, requestOptions);
    }

    getallCommentProduct()
    {
      return this.httpClient.get(this.rootUrl+'api/CommentProducts').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the CommentProduct list method///////////////////////////////
      getalltheCommentProduct(){
        return this.http.get(this.rootUrl+'api/CommentProducts').pipe(map((data : Response)=>{
          return data.json() as CommentProductModel[];
        })).toPromise().then(x => {
          this.CommentProductModellist = x;
        })
      }
     // get CommentProduct information
      getCommentProduct(){
        return this.http.get(this.rootUrl+'api/GetCommentProducts?id='+localStorage.getItem("producid")).pipe(map((data : Response)=>{
          return data.json() as CommentProductModel[];
        })).toPromise().then(x => {
          this.allCommentProductModellist = x;
        })
      }
    
      getspecifiedCommentProduct(){
        return this.http.get(this.rootUrl+'api/CommentProducts').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedCommentProductModel.next(data);
        })
      }

      //update CommentProduct

    UpdateCommentProduct(id,commentProductModel){
        var body = JSON.stringify(commentProductModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/CommentProducts/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteCommentProduct(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/CommentProducts/'+id).pipe(map((res => res.json())));
      }
}
