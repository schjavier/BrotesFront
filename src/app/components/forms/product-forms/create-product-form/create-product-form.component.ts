import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {ProductService} from '../../../../services/product-service/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from '../../../../services/notification-service/notification.service';

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

    notifier = inject(NotificationService)
    productService = inject(ProductService)

    constructor() {

    }

  onSubmit(): void{
    if(this.createProductForm.valid){
       this.productService.createProduct(this.createProductForm.value).subscribe();
       this.notifier.notifyInfo("Producto Creado", 2000)
       this.createProductForm.reset();
    } else {
      this.createProductForm.markAllAsTouched()
    }
  }

}
