import { Component, OnInit } from '@angular/core';
import {BooksModel} from '../pick-up-models/books-model';
import {NgForm} from '@angular/forms';
import {BooksService} from '../pick-up-services/books.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
const URL = 'http://localhost:3000/files';

@Component({
  selector: 'app-add-books-and-stationery',
  templateUrl: './add-books-and-stationery.component.html',
  styleUrls: ['./add-books-and-stationery.component.css'],
  providers : [BooksService]
})
export class AddBooksAndStationeryComponent implements OnInit {

bookmodel : BooksModel;
Imageurl : string = "/assets/default_profile_image.png";
fileToUpload : File = null;

selectedFile: File = null;
fd = new FormData();
  constructor(private bookservice : BooksService, private toaster : ToastrService,private route : Router,private http: Http) { }

  ngOnInit() {
    this.bookservice.getbook();
    this.bookservice.getspecifiedBook();

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

  handleFileInput(file : FileList){

    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event:any) =>{
    this.Imageurl = event.target.result;
    }
  reader.readAsDataURL(this.fileToUpload);
  console.log(this.fileToUpload.name);
  this.bookservice.selectedbooking.Image =  this.fileToUpload.name;
  }

  
  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('photo', this.selectedFile, this.selectedFile.name);
  }



  onSubmit(form? : NgForm){

          // NODE JS SERVER 
     this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
            (success) => {
                 
           },
           (error) => alert(error));
    // C# BACK END

    this.bookservice.PostBook(form.value)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       this.resetForm(form);
        this.toaster.success('your Books details are successfully saved');
        location.reload();
       }); 
  }

  UpdateBooking(form? : NgForm){
         // NODE JS SERVER 
         this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
          (success) => {
               
         },
         (error) => alert(error));
  // C# BACK END update
    this.bookservice.Updatebooks(form.value.BookID, form.value)
    .subscribe(data => {
      this.resetForm(form);
     //this.userdetailComponent.getUserClaims();
      this.toaster.info('Record Updated Successfully');
      location.reload();
    ;
    })
  }

  showForEdit(bookmodel : BooksModel ){
    this.bookservice.selectedbooking = Object.assign({}, bookmodel);
  }


  onDelete(id : number){
    if(confirm("are you sure you want to delete?")==true){
      this.bookservice.DeleteBookings(id).subscribe(x =>{
      this.bookservice.getallthebooks();
      this.toaster.warning('Deleted Successfully');
      }
    )
    }
  }

}
