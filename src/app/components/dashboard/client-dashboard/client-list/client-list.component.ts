import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../services/client-service/client-service.service';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {Client} from '../../../../model/client/client';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {DatosListaCliente} from '../../../../model/client/datos-lista-cliente';

@Component({
  selector: 'app-client-list',
    imports: [
        NgForOf,
        AsyncPipe,
        NgIf,
        MatIcon,
        MatPaginator
    ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  clientList$!: Observable<DatosListaCliente[] | null>;
  errorMessage:string | null = null;
  isMobile: boolean = false;

  totalItems:number = 0;
  currentPage:number = 0;

  constructor(private clientService: ClientService) {
    this.clientList$ = of([]);
  }

  toggleDetails(client:Client): void{
      this.isMobile = window.innerWidth <= 576;

      if (this.isMobile){
        client.isExpanded = !client.isExpanded;

      } else {
          client.isExpanded = false;
      }
  }

  ngOnInit() {
    this.loadClients();
    }

  loadClients():void {
      this.errorMessage = null;

      this.clientList$ = this.clientService.getAllClients(this.currentPage).pipe(
          tap(response => this.totalItems = response.totalElements),
          map(clients => clients.content.map(client => ({...client, isExpanded: false}))
          ),
          catchError(error => {
              this.errorMessage = error;
              console.error('Error al cargar clientes');
              return of(null);
        })
      );
  }


    onChangePage($event: PageEvent) {
        this.currentPage = $event.pageIndex;

        this.loadClients()

    }

}
