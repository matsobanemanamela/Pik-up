import { Component, OnInit } from '@angular/core';
import {TransportModel} from '../pick-up-models/transport-model';
import {TransportServiceService} from '../pick-up-services/transport-service.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
const URL = 'http://localhost:3000/files';

@Component({
  selector: 'app-add-transport',
  templateUrl: './add-transport.component.html',
  styleUrls: ['./add-transport.component.css'],
  providers:[TransportServiceService]
})
export class AddTransportComponent implements OnInit {
  Imageurl : string = "/assets/default_profile_image.png";
  fileToUpload : File = null;
  transportmodel: TransportModel;
  today = new Date().toJSON().split('T')[0];
  selectedFile: File = null;
  fd = new FormData();
  constructor(private transportservice : TransportServiceService,private toaster : ToastrService,private route : Router,private http: Http ) { }

  ngOnInit() {
    
   this.transportservice.getallthetransport();
   this.transportservice.getspecifiedtransportss();
   this.transportservice.gettransport();
 this.resetForm();

  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();

    this.transportservice.selectedtransport={

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
  console.log(this.fileToUpload.name);
  this.transportservice.selectedtransport.Image = this.fileToUpload.name;
  }


    onSubmit(form? : NgForm){

    // NODE JS SERVER 
    this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
          (success) => {         
           },
       (error) => alert(error));
    // C# BACK END
      this.transportservice.Posttransport(form.value)
      .subscribe((data:any) => {
          if (data.Succeeded == true)
         this.resetForm(form);
          this.toaster.success('your Transportation details are successfully saved');
          location.reload();
         }); 
    }
  
    UpdateTransport(form? : NgForm){
  // NODE JS SERVER 
  this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
    (success) => {         
     },
 (error) => alert(error));
// C# BACK END

      this.transportservice.Updatetransport(form.value.TransportationID, form.value)
      .subscribe(data => {
        this.resetForm(form);
       //this.userdetailComponent.getUserClaims();
        this.toaster.info('Record Updated Successfully');
        location.reload();
      ;
      })
    }
  
    showForEdit(transportmodel: TransportModel){
      this.transportservice.selectedtransport = Object.assign({}, transportmodel);
    }
  
  
    onDelete(id : number){
      if(confirm("are you sure you want to delete?")==true){
        this.transportservice.DeleteProduct(id).subscribe(x =>{
          this.transportservice.getallthetransport();
        this.toaster.warning('Deleted Successfully');
        }
      )
      }
    }

}
