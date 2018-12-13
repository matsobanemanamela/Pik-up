import { Component, OnInit } from '@angular/core';
import {CommentServiceModel} from '../pick-up-comment-models/comment-service-model';
import {CommentServiceService} from '../pick-up-comment-service/comment-service.service';
import {LikeServiceModel} from '../pick-up-likes-models/like-service-model';
import {LikeServiceService} from '../pick-up-likes-service/like-service.service';
import {ServiceModel} from '../pick-up-models/service-model';
import {ServicesService} from '../pick-up-services/services.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-and-service',
  templateUrl: './product-and-service.component.html',
  styleUrls: ['./product-and-service.component.css'],
  providers: [CommentServiceService,LikeServiceService,ServicesService]
})
export class ProductAndServiceComponent implements OnInit {

  likeservicemodel : LikeServiceModel;
  commentservicemodel : CommentServiceModel;
  servicemodel : ServiceModel;

  constructor(private servicesservice : ServicesService,private toaster : ToastrService,private route : Router, private commentservice : CommentServiceService,private likeservice : LikeServiceService ) { }

  ngOnInit() {
this.servicesservice.getallService();

    this.resetForm();
  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();

    this.servicemodel={
      ServiceID: 0,
      UserID :  +localStorage.getItem("CustomerID"),
      Typeofservice : '',
      ServiceImage:'',
      Serviceprice: 0,
      Comment: ''
    }
  }

  onClick(event, servicemodel){
    console.log(servicemodel); // here your cart item object will be shown
    // do your stuff here with your cartItem
 localStorage.setItem('example1',servicemodel + '');
  }

  // onClick2(event, accomodationmodel){
  //   console.log(accomodationmodel);
  // }


  onSubmit(){

    let dateFormat = require('dateformat');
    let now = new Date();
   var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   var com = document.getElementById("Comments") as HTMLInputElement;
    // NODE JS SERVER 
    this.commentservicemodel={
      CommentID: 0, 
      ServiceID : +localStorage.getItem("example1"),
      UserID: +localStorage.getItem("CustomerID"),
      DateandTime: date,
      Comments: com.value
      
    }
    this.commentservice.PostCommentService(this.commentservicemodel)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       
        this.toaster.success('your have commented successfully');
        location.reload();
       }); 
  }

  onSubmitlikes(servicemodel : ServiceModel){

    let dateFormat = require('dateformat');
    let now = new Date();
   var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   var com = document.getElementById("Comments") as HTMLInputElement;
    // NODE JS SERVER 
    this.likeservicemodel={
      likeId: 0, 
      ServiceID : servicemodel.ServiceID,
      UserID: +localStorage.getItem("CustomerID"),
      DateTime: date,
      Condition: 'true'
    }
    this.likeservice.PostLikeService(this.likeservicemodel)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
        // this.toaster.success('your have  successfully');
        location.reload();
       }); 
  }
}
