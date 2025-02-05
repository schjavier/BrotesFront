import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ClientService} from '../../../../services/client-service.service';
import {CreateClientDto} from '../../../../model/client/create-client-dto';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-client-form',
  imports: [FormsModule, ReactiveFormsModule, MatButton],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css'
})
export class CreateClientFormComponent {

  formTitle: string = "Crear Clientes";

  createForm:FormGroup = new FormGroup ({

    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required),

});

  get name():string{
    return this.createForm.controls['name'].value;
  }

  constructor(private clientService: ClientService) {
  }


  createDto(name:string, adress:string, phone:string):CreateClientDto{
    return new CreateClientDto (name, adress, phone);
  }

  createClient():void {

    let clientDto:CreateClientDto = this.createDto(
      this.createForm.controls['name'].value,
      this.createForm.controls['adress'].value,
      this.createForm.controls['phone'].value,
      )

    this.clientService.createClient(clientDto).subscribe(
          client => {
            console.log("Client created successfully:", client);
          });
    this.createForm.reset();

  }

}
