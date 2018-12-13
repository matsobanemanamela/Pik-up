import { Injectable } from '@angular/core';
import {LikeBooksModel} from '../pick-up-likes-models/like-books-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeBooksService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedLikeBooksModel : Subject<Array<LikeBooksModel>> = new BehaviorSubject<Array<LikeBooksModel>>([]);
  selectedLikeBooksModel : LikeBooksModel; 
  likeBooksModel : LikeBooksModel;
  LikeBooksModellist : LikeBooksModel[];
  allLikeBooksModellist : LikeBooksModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }
 
  PostLikeBooks(likeBooksModel : LikeBooksModel){
    var body = JSON.stringify(likeBooksModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/LikeBooks', body, requestOptions);
    }

    getallLikeBooks()
    {
      return this.httpClient.get(this.rootUrl+'api/LikeBooks').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the LikeBooks list method///////////////////////////////

      getalltheLikeBooks(){
        return this.http.get(this.rootUrl+'api/LikeBooks').pipe(map((data : Response)=>{
          return data.json() as LikeBooksModel[];
        })).toPromise().then(x => {
          this.LikeBooksModellist = x;
        })
      }
     // get LikeBooks information

    getLikeBooks(){
        return this.http.get(this.rootUrl+'api/GetLikeBooks?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as LikeBooksModel[];
        })).toPromise().then(x => {
          this.allLikeBooksModellist = x;
        })
    }
    
      getspecifiedLikeBooks(){
        return this.http.get(this.rootUrl+'api/LikeBooks').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedLikeBooksModel.next(data);
        })
      }

      //update LikeBooks

    UpdateLikeBooks(id,likeBooksModel){
        var body = JSON.stringify(likeBooksModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/LikeBooks/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteLikeBooks(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/LikeBooks/'+id).pipe(map((res => res.json())));
      }

}
