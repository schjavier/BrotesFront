import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ClientService} from '../../../../services/client-service/client-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/select';
import {NgIf} from '@angular/common';
import {NotificationService} from '../../../../services/notification-service/notification.service';

@Component({
  selector: 'app-create-client-form',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
    ],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css'
})
export class CreateClientFormComponent {

  formTitle: string = "Cargar Clientes";

  createClientForm:FormGroup = new FormGroup ({

    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),

});

  clientService = inject(ClientService);
  notifier = inject(NotificationService);

  constructor() {
  }

  onSubmit():void{
      if(this.createClientForm.valid){
          this.clientService.createClient(this.createClientForm.value).subscribe();
          this.notifier.notifyInfo('Cliente Creado', 3000);
          this.createClientForm.reset();
      } else {
          this.createClientForm.markAllAsTouched();
      }

  }


}
