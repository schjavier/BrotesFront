import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientService} from '../../../../services/client-service/client-service.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {SearchBarComponent} from '../../../search-bar/search-bar.component';
import {Client} from '../../../../model/client/client';
import {Observable} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {UpdateClientDto} from '../../../../model/client/update-client-dto';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-client-form',
  imports: [
    ReactiveFormsModule,
    MatSlideToggle,
    SearchBarComponent,
    MatButton,
    NgIf
  ],
  templateUrl: './update-client-form.component.html',
  styleUrl: './update-client-form.component.css'
})
export class UpdateClientFormComponent {

  formTitle = 'Actualizar Cliente';
  errorMessage: string | null = null;

  client$!:Observable<Client>;
  client!:Client;

  isClientActive: boolean = true;

  popUp: MatSnackBar = new MatSnackBar();

  updateClientForm: FormGroup = new FormGroup({

    id: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),


  })

  constructor(private clientService: ClientService) {
  }

  searchClientByName(searchTerm: string) {

    this.errorMessage = null;
    this.updateClientForm.reset();

    this.client$ = this.clientService.getClientByName(searchTerm.toLowerCase());

    this.client$.subscribe( {
      next: client => {

        this.client = client;

        this.updateForm(
          this.client.id,
          this.client.nombre,
          this.client.direccion,
          this.client.telefono);

        this.isClientActive = client.activo;
        }, error: error => {
        this.errorMessage = error.message;
      }
    } );
  }


  updateForm(id:number, nombre:string, direccion:string, telefono:string):void{

    this.updateClientForm.setValue({
      id: id,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,

    })
  }

  toggleClient(clientId: number, isChecked:boolean) {
    if(isChecked){
      this.activateClient(clientId);
    } else {
      this.deactivateClient(clientId);
    }
    this.isClientActive = isChecked;

  }

  deactivateClient(clientId: number) {
    this.clientService.deactivateClient(clientId).subscribe({
        next: ()=> {
          console.log("Cliente Desactivado");
          this.popUp.open("Cliente Desactivado", "OK" ,{
            duration:3000
          })
        }, error: error => {
          this.errorMessage = error.message;

        }}
    );
  }

  activateClient(clientId: number) {
    this.clientService.activateClient(clientId).subscribe({
      next: ()=> {
        console.log("Cliente Activado");
        this.popUp.open("Cliente Activado", "OK" ,{
          duration:3000
        })
      }, error: error => {
        this.errorMessage = error.message;
      }
    })
  }

  deleteClient(clientId: number) {
    this.clientService.deleteClient(clientId).subscribe({
      next: () => {
        console.log("Cliente Eliminado");
        this.popUp.open("Cliente Eliminado", "OK" ,{
          duration:3000
        })
      }, error: error => {
        this.errorMessage = error.message;
      }
    })
    this.updateClientForm.reset();
  }

  updateClient() {

    let dataClient:UpdateClientDto = new UpdateClientDto(
      this.updateClientForm.get('id')?.value,
      this.updateClientForm.get('nombre')?.value,
      this.updateClientForm.get('direccion')?.value,
      this.updateClientForm.get('telefono')?.value,
    )


    this.clientService.updateClient(dataClient).subscribe({
      next: ()=> {
        console.log("Cliente Actualizado");
        this.popUp.open("Cliente Actualizado", "OK" ,{
          duration:3000
        })
      }, error: error => {
        this.errorMessage = error.message;
      }
    });
  }
}
