import { Component, OnInit,ElementRef, Input } from '@angular/core';
import {AccommodationModel} from '../pick-up-models/accommodation-model'; 
import {AccommodationServiceService} from '../pick-up-services/accommodation-service.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
const URL = 'http://localhost:3000/files';

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers : [AccommodationServiceService]
})
export class AddAccommodationComponent implements OnInit {
  
  accomodationmodel : AccommodationModel;
  Imageurl : string = "/assets/default_profile_image.png";
  imageRoom : string = "/assets/default_profile_image.png";
  KitchenImg : string = "/assets/default_profile_image.png";
  BathroomImg : string = "/assets/default_profile_image.png";
  fileToUpload : File = null;
  fileupd : File = null;
  selectedFile: File = null;
  fd = new FormData();
  sd = new FormData();

  constructor(private accomodationservice : AccommodationServiceService,private toaster : ToastrService,private route : Router,private http: Http, private el: ElementRef) { }


  ngOnInit() {
    this.accomodationservice.getAccommodation();
    this.accomodationservice.getalltheAccommodation();
    this.accomodationservice.getspecifiedAccommodation();
    this.resetForm();
  }
 
  resetForm(form? : NgForm){

    if(form != null)
    form.reset();
    this.accomodationservice.selectedAccommodation ={
      AccommodationID : 0,
      UserID : +localStorage.getItem("CustomerID"),
      TypeOfAccommodation: '',
      NumberofRooms: 1,
      NumberofPeoplePerRoom : 0,
      DistancetoCampus : '',
      WIFI : '',
      Price : 0,
      Comment : '',
      Address : '',
      Suburb : '',
      City : '',
      Province : '',
      Country : '',
      PostalCode : '',
      MainImage : '',
      RoomImage : '',
      KitchenImage : '',
      BathroomImage : ''

    }
  }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('photo', this.selectedFile, this.selectedFile.name);
  }

  createForm(event) {
    this.fileupd = <File>event.target.files[0];
    this.fd.append('photo', this.fileupd, this.fileupd.name);
  }


  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.Imageurl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload.name);
    this.accomodationservice.selectedAccommodation.MainImage = this.fileToUpload.name;
  }

  handleFileInputRoom(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageRoom = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload.name);
    this.accomodationservice.selectedAccommodation.RoomImage = this.fileToUpload.name;
  }

  handleFileInputkitchen(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.KitchenImg = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload.name);
    this.accomodationservice.selectedAccommodation.KitchenImage = this.fileToUpload.name;
  }
  handleFileInputbath(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.BathroomImg = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload.name);
    this.accomodationservice.selectedAccommodation.BathroomImage = this.fileToUpload.name;
  }

  onSubmit(form? : NgForm){
  
    // NODE JS SERVER 
    this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
      (success) => {
           
     },
     (error) => alert(error));
// C# BACK END
    this.accomodationservice.PostAccommodation(form.value)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       this.resetForm(form);
        this.toaster.success('your Service details are successfully saved');
        location.reload();
       }); 
  }

  UpdateAccommodation(form? : NgForm){

    this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
      (success) => {
           
     },
     (error) => alert(error));

    this.accomodationservice.UpdateAccommodation(form.value.AccommodationID, form.value)
    .subscribe(data => {
      this.resetForm(form);
     //this.userdetailComponent.getUserClaims();
      this.toaster.info('Record Updated Successfully');
      location.reload();
    ;
    })
  }

  showForEdit(accomodationmodel : AccommodationModel){
    this.accomodationservice.selectedAccommodation = Object.assign({}, accomodationmodel);
  }


  onDelete(id : number){
    if(confirm("are you sure you want to delete?")==true){
      this.accomodationservice.DeleteAccommodation(id).subscribe(x =>{
        this.accomodationservice.getalltheAccommodation();
      this.toaster.warning('Deleted Successfully');
      }
    )
    }
  }


}
