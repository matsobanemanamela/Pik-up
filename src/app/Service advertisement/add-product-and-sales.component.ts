import { Component, OnInit,ElementRef, Input} from '@angular/core';
import {ServiceModel} from '../pick-up-models/service-model';
import {ServicesService} from '../pick-up-services/services.service';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
const URL = 'http://localhost:3000/files';

@Component({
  selector: 'app-add-product-and-sales',
  templateUrl: './add-product-and-sales.component.html',
  styleUrls: ['./add-product-and-sales.component.css'],
providers: [ServicesService]
})
export class AddProductAndSalesComponent implements OnInit {
servicemodel : ServiceModel;
imageUrl : string = "/assets/default_profile_image.png";
  fileToUpload : File = null;

  selectedFile: File = null;
  fd = new FormData();
  constructor(private servicesservice : ServicesService,private toaster : ToastrService,private route : Router,private http: Http, private el: ElementRef) { }

  ngOnInit() {
  
    this.servicesservice.getallService();
    this.servicesservice.getService();
    this.servicesservice.getspecifiedService();
    this.resetForm();
  
  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();

    this.servicesservice.selectedservice={

      ServiceID: 0,
      UserID :  +localStorage.getItem("CustomerID"),
      Typeofservice : '',
      ServiceImage:'',
      Serviceprice: 0,
      Comment: ''
    }
  }
  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('photo', this.selectedFile, this.selectedFile.name);
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log(this.fileToUpload.name);
    this.servicesservice.selectedservice.ServiceImage = this.fileToUpload.name;
  }
    // upload() {

    //       // let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo-id');
    //       // let fileCount: number = inputEl.files.length;
    //       // let formData = new FormData();
    //       // if (fileCount > 0) { // a file was selected
            
    //               // formData.append('photo', inputEl.files.item(0));
             
    //           this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
    //                (success) => {
                        
    //               },
    //               (error) => alert(error));
    //         // }
    //      }

    onSubmit(form? : NgForm){
  
      // NODE JS SERVER 
      this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
        (success) => {
             
       },
       (error) => alert(error));
// C# BACK END
      this.servicesservice.Postservice(form.value)
      .subscribe((data:any) => {
          if (data.Succeeded == true)
         this.resetForm(form);
          this.toaster.success('your Service details are successfully saved');
          location.reload();
         }); 
    }
  
    UpdateService(form? : NgForm){

      this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
        (success) => {
             
       },
       (error) => alert(error));

      this.servicesservice.Updateservice(form.value.ServiceID, form.value)
      .subscribe(data => {
        this.resetForm(form);
       //this.userdetailComponent.getUserClaims();
        this.toaster.info('Record Updated Successfully');
        location.reload();
      ;
      })
    }
  
    showForEdit(servicemodel : ServiceModel){
      this.servicesservice.selectedservice = Object.assign({}, servicemodel);
    }
  
  
    onDelete(id : number){
      if(confirm("are you sure you want to delete?")==true){
        this.servicesservice.DeleteService(id).subscribe(x =>{
          this.servicesservice.getallService();
        this.toaster.warning('Deleted Successfully');
        }
      )
      }
    }


}
