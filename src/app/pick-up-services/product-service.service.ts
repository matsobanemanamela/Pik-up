import { Injectable } from '@angular/core';
import {ProductModel} from '../pick-up-models/product-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  readonly rootUrl = "http://localhost:52539/";
  getspecifiedproduct : Subject<Array<ProductModel>> = new BehaviorSubject<Array<ProductModel>>([]);
selectedproduct : ProductModel;
  productmodel : ProductModel;
  productlist : ProductModel[];
  allproductlist : ProductModel[];


constructor(private http : Http, private httpClient : HttpClient) { }

PostProducts(productmodel : ProductModel){
  var body = JSON.stringify(productmodel);
  var headersOption = new Headers({'Content-Type':'application/json'});
  var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
   return this.http.post(this.rootUrl + 'api/Products', body, requestOptions);
  }

  getprod(){
    return this.httpClient.get(this.rootUrl+'api/Products').pipe(map((data:Response)=> data.json()));
  }

/////////////get all the product /////////////////////////
    getalltheProducts(){
      return this.http.get(this.rootUrl+'api/Geteveyproduct').pipe(map((data : Response)=>{
        return data.json() as ProductModel[];
      })).toPromise().then(x => {
        this.allproductlist = x;
      })
     
    }
   // get user information
    getProducts(){
      return this.http.get(this.rootUrl+'api/GetProduct?id='+localStorage.getItem("CustomerID")).pipe(map((data : Response)=>{
        return data.json() as ProductModel[];
      })).toPromise().then(x => {
        this.productlist = x;
      })
    }
  
    getspecifiedProducts(){
      return this.http.get(this.rootUrl+'api/Products').pipe(map((data : Response)=>{
        return data.json()
      })).subscribe((data : any)=>{
        this.getspecifiedproduct.next(data);
      })
    }

    //update user profile

  UpdateProducts(id,productmodel){
      var body = JSON.stringify(productmodel);
      var headerOptions = new Headers({'Content-Type': 'application/json'});
      var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
      return this.http.put(this.rootUrl +'api/Products/'+id,body,requestOptions).pipe(map(res =>res.json()));
    }

    DeleteProduct(id : number)
    {
      return this.http.delete(this.rootUrl +'api/Products/'+id).pipe(map((res => res.json())));
    }
}
