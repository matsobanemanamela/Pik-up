import { Component, OnInit } from '@angular/core';
import {TransportModel} from '../pick-up-models/transport-model';
import {TransportServiceService} from '../pick-up-services/transport-service.service';
import {CommentTransportModel} from '../pick-up-comment-models/comment-transport-model';
import {CommentTransportService} from '../pick-up-comment-service/comment-transport.service';
import {LikeTransportModel} from '../pick-up-likes-models/like-transport-model';
import {LikeTransportService} from '../pick-up-likes-service/like-transport.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.css'],
  providers:[TransportServiceService,CommentTransportService, LikeTransportService]
})
export class TransportationComponent implements OnInit {

  transportmodel: TransportModel;
  liketransportmodel : LikeTransportModel;
  commenttransportmodel : CommentTransportModel;

  constructor(private commenttransportservice : CommentTransportService, private liketransportservice : LikeTransportService ,private transportservice : TransportServiceService,private toaster : ToastrService,private route : Router) { }

  ngOnInit() {
    this.transportservice.getallthetransport();
    this.transportservice.getspecifiedtransportss();
    this.commenttransportservice.getalltheCommentTransport();
    // this.transportservice.gettransport();
  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();

    this.transportmodel={

      TransportationID : 0,
      UserID: +localStorage.getItem("CustomerID"),
      DepartureDestination: '',
      ArrivalDestination: '',
      DepartureDate: '',
      Image: '',
      NumberOfPassengers: 0,
      Price: 0,
      Comment : ''
    }
  }

  onClick(event, transportmodel){
    console.log(transportmodel); // here your cart item object will be shown
    // do your stuff here with your cartItem
 localStorage.setItem('example1',transportmodel + '');
  }


  onSubmit(){

    let dateFormat = require('dateformat');
    let now = new Date();
   var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   var com = document.getElementById("Comments") as HTMLInputElement;
    // NODE JS SERVER 
    this.commenttransportmodel={
      CommentID: 0, 
      TransportationID : +localStorage.getItem("example1"),
      UserID: +localStorage.getItem("CustomerID"),
      DateandTime: date,
      Comments: com.value
      
    }
    this.commenttransportservice.PostCommentTransport(this.commenttransportmodel)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       
        this.toaster.success('your have commented successfully');
        location.reload();
       }); 
  }

  onSubmitlikes(transportmodel : TransportModel){

    let dateFormat = require('dateformat');
    let now = new Date();
   var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   var com = document.getElementById("Comments") as HTMLInputElement;
    // NODE JS SERVER 
    this.liketransportmodel={
      likeId: 0, 
      TransportationID : transportmodel.TransportationID,
      UserID: +localStorage.getItem("CustomerID"),
      DateTime: date,
      Condition: 'true'
    }
    this.liketransportservice.PostLikeTransport(this.liketransportmodel)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
        // this.toaster.success('your have  successfully');
        location.reload();
       }); 
  }


  geteToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();

    if(dd<10){
        dd= +('0'+dd);
    } 
    if(mm<10){
        mm = +('0'+mm);
    } 
    return dd+'/'+mm+'/'+yyyy;
    
  }
}
