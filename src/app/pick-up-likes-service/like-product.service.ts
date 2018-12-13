import { Injectable } from '@angular/core';
import {LikeProductModel} from '../pick-up-likes-models/like-product-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LikeProductService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedLikeProductModel : Subject<Array<LikeProductModel>> = new BehaviorSubject<Array<LikeProductModel>>([]);
  selectedLikeProductModel : LikeProductModel; 
  likeProductModel : LikeProductModel;
  LikeProductModellist : LikeProductModel[];
  allLikeProductModellist : LikeProductModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }
  
  PostLikeProduct(likeProductModel : LikeProductModel){
    var body = JSON.stringify(likeProductModel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/LikeProducts', body, requestOptions);
    }

    getallLikeProduct()
    {
      return this.httpClient.get(this.rootUrl+'api/LikeProducts').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the LikeProduct list method///////////////////////////////

      getalltheLikeProduct(){
        return this.http.get(this.rootUrl+'api/LikeProducts').pipe(map((data : Response)=>{
          return data.json() as LikeProductModel[];
        })).toPromise().then(x => {
          this.LikeProductModellist = x;
        })
      }
     // get LikeProduct information

    getLikeProduct(){
        return this.http.get(this.rootUrl+'api/GetLikeProducts?id='+localStorage.getItem("")).pipe(map((data : Response)=>{
          return data.json() as LikeProductModel[];
        })).toPromise().then(x => {
          this.allLikeProductModellist = x;
        })
    }
    
      getspecifiedLikeProduct(){
        return this.http.get(this.rootUrl+'api/LikeProducts').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedLikeProductModel.next(data);
        })
      }

      //update LikeProduct

    UpdateLikeProduct(id,likeProductModel){
        var body = JSON.stringify(likeProductModel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/LikeProducts/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteLikeProduct(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/LikeProducts/'+id).pipe(map((res => res.json())));
      }

}
