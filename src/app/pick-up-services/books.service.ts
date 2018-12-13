import { Injectable } from '@angular/core';
import {BooksModel} from '../pick-up-models/books-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  readonly rootUrl = "http://localhost:52539/";

  getspecifiedbook : Subject<Array<BooksModel>> = new BehaviorSubject<Array<BooksModel>>([]);
  selectedbooking : BooksModel; 
  bookmodel : BooksModel;
  bookslist : BooksModel[];
  allbooklist : BooksModel[];
  
  constructor(private http : Http, private httpClient : HttpClient) { }

  PostBook(bookmodel : BooksModel){
    var body = JSON.stringify(bookmodel);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/Books', body, requestOptions);
    }

    getallbook()
    {
      return this.httpClient.get(this.rootUrl+'api/Books').pipe(map((data:Response)=> data.json()));
    }
////////////////get all the books list method///////////////////////////////
      getallthebooks(){
        return this.http.get(this.rootUrl+'api/GeteveryBooksDetails').pipe(map((data : Response)=>{
          return data.json() as BooksModel[];
        })).toPromise().then(x => {
          this.allbooklist = x;
        })
      }
     // get user information
      getbook(){
        return this.http.get(this.rootUrl+'api/GetBooksDetails?id='+localStorage.getItem("CustomerID")).pipe(map((data : Response)=>{
          return data.json() as BooksModel[];
        })).toPromise().then(x => {
          this.bookslist = x;
        })
      }
    
      getspecifiedBook(){
        return this.http.get(this.rootUrl+'api/Books').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.getspecifiedbook.next(data);
        })
      }

      //update user profile

    Updatebooks(id,bookmodel){
        var body = JSON.stringify(bookmodel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/Books/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }

      DeleteBookings(id : number)
      {
        return this.http.delete(this.rootUrl + 'api/Books/'+id).pipe(map((res => res.json())));
      }
}
