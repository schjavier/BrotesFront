import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../services/client-service/client-service.service';
import {catchError, Observable, of} from 'rxjs';
import {Client} from '../../../../model/client/client';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-client-list',
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf
    ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  clientList$!: Observable<Client[] | null>;
  errorMessage:string | null = null;



  constructor(private clientService: ClientService) {
    this.clientList$ = of([]);
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients():void {
      this.errorMessage = null;
      this.clientList$ = this.clientService.getAllClients().pipe(
          catchError(error => {
              this.errorMessage = error;
              console.error('Error al cargar clientes');
              return of(null);
        })
      );
  }



}
