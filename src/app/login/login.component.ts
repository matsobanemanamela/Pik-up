import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../Shared/user-service.service';
import {UserModel} from '../Shared/user-model';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError : boolean = false;
  user : UserModel;
  pict : string = "http://localhost:8081/clouds.jpg";
  constructor(private userservice : UserServiceService, private route : Router, private toaster : ToastrService) { }

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
    Institution : '',
    MobileNumber: '',
    Gender: ''
    }
  }
  
  OnSubmit(Email,Password){
 
    this.userservice.userAuthentication(Email,Password).subscribe((data : any)=>{
    localStorage.setItem('userToken', data.access_token);
    this.toaster.success('WELCOME ',Email);
    this.route.navigate(['/homepage'])
    },
       
    (err : HttpErrorResponse)=>{
    this.isLoginError = true;
    this.toaster.error('incorrect password & Email');
    });
    } 

}
