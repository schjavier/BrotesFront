import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-create-client-form',
  imports: [FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css'
})
export class CreateClientFormComponent {

  formTitle: string = "Crear Clientes";

  createForm:FormGroup = new FormGroup ({

    name: new FormControl(''),
    adress: new FormControl(''),
    phone : new FormControl(''),

});

}
