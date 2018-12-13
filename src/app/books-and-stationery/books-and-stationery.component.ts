import { Component, OnInit } from '@angular/core';
import {CommentBooksModel} from '../pick-up-comment-models/comment-books-model';
import {CommentBooksService} from '../pick-up-comment-service/comment-books.service';
import {LikeBooksService} from '../pick-up-likes-service/like-books.service';
import {LikeBooksModel} from '../pick-up-likes-models/like-books-model';
import {BooksModel} from '../pick-up-models/books-model';
import {BooksService} from '../pick-up-services/books.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-books-and-stationery',
  templateUrl: './books-and-stationery.component.html',
  styleUrls: ['./books-and-stationery.component.css'],
  providers:[CommentBooksService,BooksService,LikeBooksService]
})
export class BooksAndStationeryComponent implements OnInit {

  bookmodel : BooksModel;
 commentBooksmodel : CommentBooksModel;
 likebooksmodel : LikeBooksModel;
  constructor(private likebookservice : LikeBooksService,private commentbookservice : CommentBooksService,private bookservice : BooksService, private toaster : ToastrService,private route : Router) { }

  ngOnInit() {
    this.bookservice.getallthebooks();
    this.bookservice.getspecifiedBook();
// this.commentbookservice.getalltheCommentBooks();
// this.commentbookservice.getCommentBooks();
    this.resetForm();

  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();
    this.bookservice.selectedbooking={

      BookID : 0,
      UserID : +localStorage.getItem("CustomerID"),
      BookName: '',
      Edition: '',
      Course: '',
      neworused: '',
      Image : '',
      Price : 0,
      Comment : '' 
    }

  }

  onClick(event, bookmodel){
    console.log(bookmodel); // here your cart item object will be shown
    // do your stuff here with your cartItem
 localStorage.setItem('commenbooki',bookmodel + '');
  }

  onSubmit(){

    let dateFormat = require('dateformat');
    let now = new Date();
   var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   var com = document.getElementById("Comments") as HTMLInputElement;
    // NODE JS SERVER 
    this.commentBooksmodel={
      CommentID: 0, 
      BookID : +localStorage.getItem("commenbooki"),
      UserID: +localStorage.getItem("CustomerID"),
      DateandTime: date,
      Comments: com.value
      
    }
    this.commentbookservice.PostCommentBooks(this.commentBooksmodel)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       
        this.toaster.success('your have commented successfully');
        location.reload();
       }); 
  }

  onSubmitlikes(bookmodel : LikeBooksModel){

    let dateFormat = require('dateformat');
    let now = new Date();
   var date =  dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
   var com = document.getElementById("Comments") as HTMLInputElement;
    // NODE JS SERVER 
    this.likebooksmodel={
      likeId: 0, 
      BookID : bookmodel.BookID,
      UserID: +localStorage.getItem("CustomerID"),
      DateTime: date,
      Condition: 'true'
    }
    this.likebookservice.PostLikeBooks(this.likebooksmodel)
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
