import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ClientService} from '../../../../services/client-service.service';
import {CreateClientDto} from '../../../../model/client/create-client-dto';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-client-form',
  imports: [FormsModule, ReactiveFormsModule, MatButton, NgIf],
  templateUrl: './create-client-form.component.html',
  styleUrl: './create-client-form.component.css'
})
export class CreateClientFormComponent {

  formTitle: string = "Crear Clientes";


  createClientForm:FormGroup = new FormGroup ({

    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required),

});


  constructor(private clientService: ClientService) {
  }

  get name():string{
    return this.createClientForm.controls['name'].value;
  }


  createDto(name:string, adress:string, phone:string):CreateClientDto{
    return new CreateClientDto (name.toLowerCase(), adress, phone);
  }

  createClient():void {

    if(this.createClientForm.valid) {
      let clientDto: CreateClientDto = this.createDto(
        this.createClientForm.controls['name'].value,
        this.createClientForm.controls['adress'].value,
        this.createClientForm.controls['phone'].value,
      )


      this.clientService.createClient(clientDto).subscribe(
        client => {
          console.log("Client created successfully:", client);
        });

    }
      this.createClientForm.reset();

  }

}
