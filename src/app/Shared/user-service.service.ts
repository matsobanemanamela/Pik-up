import { Injectable } from '@angular/core';
import {UserModel} from './user-model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import{Http,Response, Headers,RequestOptions, RequestMethod} from '@angular/http';
import { Observable, Subject, ReplaySubject, from, of, range, BehaviorSubject} from 'rxjs';
import { map,mergeMap} from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  readonly rootUrl = "http://localhost:52539/";
  specifiedCustomer: Subject<Array<UserModel>> = new BehaviorSubject<Array<UserModel>>([])

usermodel : UserModel;
userlist: UserModel[];

  constructor(private http : Http, private httpClient : HttpClient) { }

  PostUser(user : UserModel){
    var body = JSON.stringify(user);
    var headersOption = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headersOption});
     return this.http.post(this.rootUrl + 'api/UserTables', body, requestOptions);
    }
    
     //USER Login Function 
    userAuthentication(UserName, Password){
      var data = "username="+UserName+"&password="+Password+"&grant_type=password";
      var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded'});
      return this.httpClient.post(this.rootUrl+'/token',data, {headers: reqHeader});
    }
    
    
    //getting authenticated Customer Details  Function
      getUserClaims(){
       return this.httpClient.get(this.rootUrl+'api/GetUserClaims',{headers : new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})});
      }
     
      getalltherusers(){

        return this.http.get(this.rootUrl+'api/UserTables');
      }

      getuserbyID(id : number){

        return this.httpClient.get(this.rootUrl+'api/UserTables/'+id).pipe(map((response : Response) => response.json()));
      }
     // get user information
      getCustomer(){
        return this.http.get(this.rootUrl+'api/UserTables').pipe(map((data : Response)=>{
          return data.json() as UserModel[];
        })).toPromise().then(x => {
          this.userlist = x;
        })
      }
    
      getspecifiedcustomer(){
        return this.http.get(this.rootUrl+'api/UserTables').pipe(map((data : Response)=>{
          return data.json()
        })).subscribe((data : any)=>{
          this.specifiedCustomer.next(data);
        })
      }

      //update user profile

      putUser(id,usermodel){
        var body = JSON.stringify(usermodel);
        var headerOptions = new Headers({'Content-Type': 'application/json'});
        var requestOptions = new RequestOptions({method: RequestMethod.Put,headers: headerOptions});
        return this.http.put(this.rootUrl +'api/UserTables/'+id,body,requestOptions).pipe(map(res =>res.json()));
      }
  
}
