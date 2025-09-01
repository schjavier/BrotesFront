import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SearchBarComponent} from "../../../search-bar/search-bar.component";
import {Product} from '../../../../model/product/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductService} from '../../../../services/product-service/product.service';
import {DatosListaProducto} from '../../../../model/product/datos-lista-producto';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-update-product-form',
    imports: [
        MatButton,
        MatSlideToggle,
        NgIf,
        ReactiveFormsModule,
        SearchBarComponent,
        MatLabel,
        MatInput,
        MatFormField,
        MatOption,
        MatSelect
    ],
  templateUrl: './update-product-form.component.html',
  styleUrl: './update-product-form.component.css'
})
export class UpdateProductFormComponent {

  errorMessage: string | null = null;
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

  getProductSuggestion = (searchTerm: string) => {
      return this.productService.getProductsSuggestionByName(searchTerm);
  };

  displayProductSuggestion = (product: DatosListaProducto):string => {
      return product ? `${product.nombre} (${product.categoria})` : '';
  };

  onProductSelected(selectedProductDto: DatosListaProducto):void{
      this.errorMessage = null;
      this.updateProductForm.reset();
      if(selectedProductDto && selectedProductDto.id){
          this.productService.getProductById(selectedProductDto.id).subscribe({
              next: (productData: Product) => {
                  this.product = productData;
                  this.updateForm(
                      this.product.id,
                      this.product.nombre,
                      this.product.precio,
                      this.product.categoria
                  );
                  this.isProductActive = productData.activo;
                  this.errorMessage = null;
              },
              error: error => {
                  this.errorMessage = error.message;
                  console.error("Error al cargar el producto: ", this.errorMessage);
                  this.updateProductForm.reset();
              }
          });
      }else {
          this.errorMessage = "No se pudo cargar el producto"
      }
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
      next: () => {
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
      next: () => {
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
        this.updateProductForm.reset();

        this.popUp.open("Producto Actualizado", "OK", {
          duration: 3000,
        });

      }, error: error => {
        this.errorMessage = error;
      }
    })
}

}
