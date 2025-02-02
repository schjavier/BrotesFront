import { Component } from '@angular/core';
import {ClientService} from '../../../../services/client-service.service';
import {Observable} from 'rxjs';
import {Client} from '../../../../model/client/client';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-client-list',
  imports: [
    AsyncPipe
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  client$! : Observable<Client>;

  constructor(private clientService: ClientService) {
  }

  ngOnInit():void {
    this.client$ = this.clientService.getClientById(6);
  }


}
