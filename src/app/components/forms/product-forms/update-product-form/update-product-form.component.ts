import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SearchBarComponent} from "../../../search-bar/search-bar.component";
import {Observable} from 'rxjs';
import {Product} from '../../../../model/product/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductService} from '../../../../services/product-service/product.service';
import {UpdateProductDTO} from '../../../../model/product/update-product-dto';

@Component({
  selector: 'app-update-product-form',
    imports: [
        MatButton,
        MatSlideToggle,
        NgIf,
        ReactiveFormsModule,
        SearchBarComponent
    ],
  templateUrl: './update-product-form.component.html',
  styleUrl: './update-product-form.component.css'
})
export class UpdateProductFormComponent {

  errorMessage: string | null = null;

  product$!:Observable<Product>;
  product!: Product;

  isProductActive: boolean = true;

  popUp:MatSnackBar = new MatSnackBar();

  updateProductForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),

  })

  constructor(private productService: ProductService) {
  }

  searchProductByName(searchTerm:string) {
    this.errorMessage = null;
    this.updateProductForm.reset();

    this.product$ = this.productService.getProductByName(searchTerm.toLowerCase());
  //todo terminar este metodo...
  }

  updateForm(id:number, nombre:string, precio:number, categoria:string):void{

      this.updateProductForm.setValue({
        id: id,
        nombre: nombre,
        precio: precio,
        categoria: categoria
      })
  }

  toggleProduct(id:number, isChecked:boolean):void{
      if(isChecked){
        this.activateProduct(id);
      } else {
        this.deactivateProduct(id);
      }
      this.isProductActive = isChecked;
  }

  activateProduct(id:number):void{
    this.productService.activateProduct(id).subscribe({
      next: ()=>{
        console.log("Producto Activado");
        this.popUp.open("Producto Activado", "OK", {
          duration: 3000,
        })
      }, error: error => {
        this.errorMessage = error
      }
    })
  }

  deactivateProduct(id:number):void{
    this.productService.deactivateProduct(id).subscribe({
      next: ()=>{
        console.log("Producto Desactivado");
        this.popUp.open("Producto Desactivado", "OK", {
          duration: 3000,
        })
      }, error: error => {
        this.errorMessage = error;
      }
    })
  }

  deleteProduct(id:number):void{
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        console.log("Producto Eliminado");
        this.popUp.open("Producto Eliminado", "OK", {
          duration: 3000,
        })
      }, error: error => {
        this.errorMessage = error;
      }
    })
    this.updateProductForm.reset();
}

updateProduct():void{

    this.productService.updateProduct(this.updateProductForm.value).subscribe({
      next: ()=>{
        console.log("Producto Actualizado");
        this.popUp.open("Producto Actualizado", "OK", {
          duration: 3000,
        })
      }, error: error => {
        this.errorMessage = error;
      }
    })
}

}
