import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {ProductService} from '../../../../services/product-service/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product-form',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './create-product-form.component.html',
  styleUrl: './create-product-form.component.css'
})
export class CreateProductFormComponent {
  formTitle:string = 'Cargar Producto';

  createProductForm:FormGroup = new FormGroup ({
    nombre: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
  });

  popUp: MatSnackBar = new MatSnackBar();

  constructor(private productService: ProductService) {
  }

  onSubmit(): void{
    if(this.createProductForm.valid){
       this.productService.createProduct(this.createProductForm.value).subscribe();
       this.popUp.open("Producto creado", "OK", {duration: 3000});
       this.createProductForm.reset();
    } else {
      this.createProductForm.markAllAsTouched()
    }
  }

}
