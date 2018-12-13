import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../Shared/user-service.service';
import {UserModel} from '../Shared/user-model';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
const URL = 'http://localhost:3000/files';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id : number;
  userArry : Array<UserModel> = [];
  arr1Length: number;
  user : UserModel;
  usercliams : any;
  validEmail:boolean = false;
Imageurl : string ;
fileToUpload : File = null;
emailPattern =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
selectedFile: File = null;
fd = new FormData();
constructor(private userservice : UserServiceService, private route : Router, private toaster : ToastrService,private http: Http) { }

  ngOnInit() {
    this.resetForm();
    this.userservice.getUserClaims().subscribe((data: any)=>{
      this.usercliams = data;
      this.id = this.usercliams.UserID;
    //  console.log(this.usercliams);
    })

    this.userservice.getuserbyID(this.id);
     
this.userservice.getspecifiedcustomer();

this.userservice.specifiedCustomer.subscribe((classtype:Array<UserModel>)=>{
 this.userArry = classtype;
 if(classtype.length > 0){
   this.arr1Length = classtype.length;
 // console.log(this.getimage())
 }
})
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

  // getimage(){
  //   for(var x =0;x < this.arr1Length; x++){
  
  //     if(this.userArry[x].UserID == +localStorage.getItem("CustomerID")){
  // return this.userArry[x].Image;
  //     }
  //   }
  // }

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

// public handleUpload(event)
// {
//     let imageFile = event.target.files[0]; //grab the image file
    
//     let fr = new FileReader(); // create a file reader (Note: It is like C#'s FileStream)
//     fr.readAsDataURL(imageFile); //initialize the FileReader with a file to read
//     fr.onload = () => // function to call when the fileReader loads a file
//     {
//         this.user.Image = fr.result.split(";base64,")[1] //get the base64 string representation of the file (without file type data)
//        // console.log("Data: ", this.user.Image);
//     } 
// }

onSubmit(form? : NgForm){
    // NODE JS SERVER 
    this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
      (success) => {
           
     },
     (error) => alert(error));
// C# BACK END
  this.userservice.putUser(form.value.UserID, form.value)
  .subscribe(data => {
    this.resetForm(form);
   //this.userdetailComponent.getUserClaims();
    this.toaster.info('Record Updated Successfully');
    location.reload();
  ;
  })
}
}
