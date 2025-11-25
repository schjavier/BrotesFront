import {Component, inject} from '@angular/core';
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
import {NotificationService} from '../../../../services/notification-service/notification.service';

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

  notifier = inject(NotificationService)

  updateProductForm: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
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
                      this.product.categoria
                  );
                  this.isProductActive = productData.activo;
                  this.errorMessage = null;
              },
              error: error => {
                  this.notifier.notifyError(error.error, 2000);
                  this.updateProductForm.reset();
              }
          });
      }else {
          this.errorMessage = "No se pudo cargar el producto"
      }
  }

  updateForm(id:number, nombre:string, categoria:string):void{

      this.updateProductForm.setValue({
        id: id,
        nombre: nombre,
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

        this.notifier.notifyInfo("Producto Activado", 2000);

      }, error: error => {
            throw error;
      }
    })
  }

  deactivateProduct(id:number):void{
    this.productService.deactivateProduct(id).subscribe({
      next: () => {

        this.notifier.notifyInfo("Producto Desactivado", 2000);

        }, error: error => {
            throw error;
      }
    })
  }

  deleteProduct(id:number):void{
    this.productService.deleteProduct(id).subscribe({
      next: () => {

        this.notifier.notifyInfo("Producto Eliminado", 2000);

      }, error: error => {
        throw error;
      }
    })
    this.updateProductForm.reset();
}

updateProduct():void{

    this.productService.updateProduct(this.updateProductForm.value).subscribe({
      next: ()=>{
        console.log("Producto Actualizado");
        this.updateProductForm.reset();

        this.notifier.notifyInfo("Producto Actualizado", 2000);

      }, error: error => {
        throw error;
      }
    })
}

}
