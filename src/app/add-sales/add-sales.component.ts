import { Component, OnInit } from '@angular/core';
import {Router} from'@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {ProductModel} from '../pick-up-models/product-model';
import {ProductServiceService} from '../pick-up-services/product-service.service';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import { map,mergeMap} from 'rxjs/operators';
const URL = 'http://localhost:3000/files';


@Component({
  selector: 'app-add-sales',
  templateUrl: './add-sales.component.html',
  styleUrls: ['./add-sales.component.css'],
  providers: [ProductServiceService]
})
export class AddSalesComponent implements OnInit {
  productmodel : ProductModel;
  Imageurl : string = "/assets/default_profile_image.png";
  fileToUpload : File = null;

  selectedFile: File = null;
fd = new FormData();

  constructor(private productservice : ProductServiceService,private toaster : ToastrService,private route : Router,private http: Http) { }

  ngOnInit() {

    this.productservice.getspecifiedProducts();
    this.productservice.getProducts();
    this.productservice.getalltheProducts();
    this.resetForm();
  }

  resetForm(form? : NgForm){

    if(form != null)
    form.reset();
this.productservice.selectedproduct={

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
this.productservice.selectedproduct.ProductImage = this.fileToUpload.name;
}



  onSubmit(form? : NgForm){
         // NODE JS SERVER 
         this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
          (success) => {
               
         },
         (error) => alert(error));
  // C# BACK END

    this.productservice.PostProducts(form.value)
    .subscribe((data:any) => {
        if (data.Succeeded == true)
       this.resetForm(form);
        this.toaster.success('your Books details are successfully saved');
        location.reload();
       }); 
  }

  UpdateProduct(form? : NgForm){
         // NODE JS SERVER 
     this.http.post(URL, this.fd).pipe(map((res:Response) => res.json())).subscribe(
            (success) => {
                 
           },
           (error) => alert(error));
    // C# BACK END

    this.productservice.UpdateProducts(form.value.ProductID, form.value)
    .subscribe(data => {
      this.resetForm(form);
     //this.userdetailComponent.getUserClaims();
      this.toaster.info('Record Updated Successfully');
      location.reload();
    ;
    })
  }

  showForEdit(productmodel : ProductModel){
    this.productservice.selectedproduct = Object.assign({}, productmodel);
  }


  onDelete(id : number){
    if(confirm("are you sure you want to delete?")==true){
      this.productservice.DeleteProduct(id).subscribe(x =>{
      this.productservice.getalltheProducts();
      this.toaster.warning('Deleted Successfully');
      }
    )
    }
  }

}
