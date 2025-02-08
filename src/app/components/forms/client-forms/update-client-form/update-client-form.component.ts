import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../../../services/client-service.service';

@Component({
  selector: 'app-update-client-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-client-form.component.html',
  styleUrl: './update-client-form.component.css'
})
export class UpdateClientFormComponent {

  formTitle = 'Actualizar Cliente';

  updateClientForm: FormGroup = new FormGroup({

    id: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),

  })

  constructor(private clientService: ClientService) {
  }

}
