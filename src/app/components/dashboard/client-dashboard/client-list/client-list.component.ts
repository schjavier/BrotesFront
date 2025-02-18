import {Component, output, Output} from '@angular/core';
import {ClientService} from '../../../../services/client-service.service';
import {Observable} from 'rxjs';
import {Client} from '../../../../model/client/client';
import {AsyncPipe, NgForOf, NgStyle} from '@angular/common';
import {ClientCardComponent} from '../client-card/client-card.component';

@Component({
  selector: 'app-client-list',
  imports: [
    ClientCardComponent,
    NgForOf,
    NgStyle
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  clientList$!: Observable<Client[]>;
  clients:Client[] = [];

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientList$ = this.clientService.getAllClients();

    this.clientList$.subscribe(clients => this.clients = clients);


  }
}
