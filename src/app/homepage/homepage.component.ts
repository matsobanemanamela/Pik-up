import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../Shared/user-service.service';
import {UserModel} from '../Shared/user-model';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccommodationServiceService} from '../pick-up-services/accommodation-service.service';
import {BooksService} from '../pick-up-services/books.service';
import {ProductServiceService} from '../pick-up-services/product-service.service';
import {ServicesService} from '../pick-up-services/services.service';
import {SkillsAndTalentServiceService} from '../pick-up-services/skills-and-talent-service.service';
import {TransportServiceService} from '../pick-up-services/transport-service.service';
import {NgForm} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import {AccommodationModel} from '../pick-up-models/accommodation-model';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers : [AccommodationServiceService,BooksService,ProductServiceService,ServicesService,SkillsAndTalentServiceService,TransportServiceService]
})
export class HomepageComponent implements OnInit {
user : UserModel;
usercliams : any
userArry : Array<UserModel> = [];
arr1Length: number;
Image : string;
userarr : UserModel[];
id : number; 



  constructor(private userservice : UserServiceService,private accommodationservice : AccommodationServiceService,private bookservice :  BooksService,
    private productservice : ProductServiceService, private serviceservice : ServicesService, private skillsandtalentservice : SkillsAndTalentServiceService,
    private transportservice : TransportServiceService ,private route : Router, private toaster : ToastrService) { }

  ngOnInit() {
    this.userservice.getalltherusers();
   
this.userservice.getUserClaims().subscribe((data: any)=>{
  this.usercliams = data;
  this.userservice.getuserbyID(this.usercliams.UserID);
  localStorage.setItem("CustomerID", this.usercliams.UserID+'');
  //this.usercliams = data;
  this.id = this.usercliams.UserID;
})

this.userservice.getCustomer();
this.userservice.getuserbyID(this.id);


this.userservice.getspecifiedcustomer();

this.accommodationservice.getAccommodation();
this.accommodationservice.getAllAccommodationList();
this.accommodationservice.getspecifiedAccommodation();

// this.bookservice.getallthebooks();
// this.bookservice.getbook();
// this.bookservice.getspecifiedBook();

// this.serviceservice.getService();
// this.serviceservice.getallService();
// this.serviceservice.getspecifiedService();

// this.productservice.getalltheProducts();
// this.productservice.getProducts();
// this.productservice.getspecifiedProducts();

// this.skillsandtalentservice.getallthetalentandskill();
// this.skillsandtalentservice.getspecifiedtalentandskill();
// this.skillsandtalentservice.gettalentandskill();

// this.transportservice.getallthetransport();
// this.transportservice.getspecifiedtransportss();
// this.transportservice.gettransport();
}

onClick(event, accomodationmodel){
  console.log(accomodationmodel); // here your cart item object will be shown
  // do your stuff here with your cartItem
  // localStorage.setItem('example',accomodationmodel + '');
}

  Logout(){
    localStorage.clear();
    this.route.navigate(['/login']);
    this.toaster.success('signed out Sucessfully')
  }
}
