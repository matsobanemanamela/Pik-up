import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../Shared/user-service.service';
import {UserModel} from '../Shared/user-model';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
const URL = 'http://localhost:3000/files';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
user : UserModel;
validEmail:boolean = false;
Imageurl : string = "/assets/default_profile_image.png";
fileToUpload : File = null;
emailPattern =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
selectedFile: File = null;
fd = new FormData(); 
userArry : Array<UserModel> = [];
arr1Length: number;
isLoginError : boolean = false;

constructor(private userservice : UserServiceService, private route : Router, private toaster : ToastrService,private http: Http) { }

  ngOnInit() {
    
    this.resetForm();
 
  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();
    this.user = {

    UserID : 0,
    Name : '',
    Surname : '',
    StudentNumber : 0,
    Email : '',
    Password : '',
    Image : '',
    Institution : 'Institution',
    MobileNumber: '',
    Gender: 'Gender'
    }
  }
    getimage(){
    for(var x =0;x < this.userArry.length; x++){
  
      
        return this.userArry[x];
      
    }
  }


  onChange(newValue) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(newValue)) {
        this.validEmail = true;
    }else {
      this.validEmail = false;
    }

  }
  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('photo', this.selectedFile, this.selectedFile.name);
  }

handleFileInput(file : FileList){

  this.fileToUpload = file.item(0);
  var reader = new FileReader();
  reader.onload = (event:any) =>{
  this.Imageurl = event.target.result;
  }
reader.readAsDataURL(this.fileToUpload);
this.user.Image = this.fileToUpload.name;
}


  onSubmit(form? : NgForm){
    // NODE JS SERVER 
    this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
      (success) => {
           
     },
     (error) => alert(error));
// C# BACK END
    this.userservice.PostUser(form.value)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       this.resetForm(form);
        this.toaster.success('You Have Successfully Registered',' User Register');
       this.route.navigate(['/login']);
       },

       (err : HttpErrorResponse)=>{
        this.isLoginError = true;
        this.toaster.error('the Emial you have Entered  already exist');
        });

       
  }

}
