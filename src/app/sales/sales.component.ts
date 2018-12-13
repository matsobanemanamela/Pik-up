import { Component, OnInit } from '@angular/core';
import {CommentProductService} from '../pick-up-comment-service/comment-product.service';
import {CommentProductModel} from '../pick-up-comment-models/comment-product-model';
import {ProductModel} from '../pick-up-models/product-model';
import {ProductServiceService} from '../pick-up-services/product-service.service';
import {LikeProductModel} from '../pick-up-likes-models/like-product-model';
import {LikeProductService} from '../pick-up-likes-service/like-product.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [ProductServiceService, CommentProductService, LikeProductService]
})
export class SalesComponent implements OnInit {
  productmodel : ProductModel;
  commentproductmodel : CommentProductModel;
  likeproductmodel : LikeProductModel;
  constructor(private likeproductservice : LikeProductService,private commentproductservice : CommentProductService,private productservice : ProductServiceService,private toaster : ToastrService,private route : Router) { }

  ngOnInit() {
  
    this.productservice.getspecifiedProducts();
    this.productservice.getProducts();
    this.productservice.getalltheProducts();
    this.commentproductservice.getspecifiedCommentProduct();
    this.commentproductservice.getalltheCommentProduct();

    this.resetForm();
  }


  resetForm(form? : NgForm){

    if(form != null)
    form.reset();
this.productmodel={

  ProductID : 0,
  UserID : +localStorage.getItem("CustomerID"),
  Productname : '',
  Categoryname : '',
  ProductImage : '',
  NumberofItem : 0,
  NeworUsed : '',
  ProductPrice : 0,
  Comment : ''

} 
}

onClick(event, accomodationmodel){
  console.log(accomodationmodel); // here your cart item object will be shown
  // do your stuff here with your cartItem
localStorage.setItem('producid',accomodationmodel + '');
}
onSubmit(){

  let dateFormat = require('dateformat');
  let now = new Date();
 var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
 var com = document.getElementById("Comments") as HTMLInputElement;
  // NODE JS SERVER 
  this.commentproductmodel={
    CommentID: 0, 
    ProductID : +localStorage.getItem("producid"),
    UserID: +localStorage.getItem("CustomerID"),
    DateandTime: date,
    Comments: com.value
    
  }
  this.commentproductservice.PostCommentProduct(this.commentproductmodel)
  .subscribe((data:any) => {
      if (data.Succeeded == true)
     
      this.toaster.success('your have commented successfully');
      location.reload();
     }); 
}

onSubmitlikes(productmodel : ProductModel){

  let dateFormat = require('dateformat');
  let now = new Date();
 var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
 var com = document.getElementById("Comments") as HTMLInputElement;
  // NODE JS SERVER 
  this.likeproductmodel={
    likeId: 0, 
    ProductID : productmodel.ProductID,
    UserID: +localStorage.getItem("CustomerID"),
    DateTime: date,
    Condition: 'true'
  }
  this.likeproductservice.PostLikeProduct(this.likeproductmodel)
  .subscribe((data:any) => {
      if (data.Succeeded == true)
      // this.toaster.success('your have  successfully');
      location.reload();
     }); 
}
// sendMessage()
// {
//     this.commentaccommodationservice.sendMessage({ message:this.messageText});
// }

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
