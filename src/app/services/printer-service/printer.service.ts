import {inject, Injectable, signal} from '@angular/core';
import {OrderDetailsDto} from '../../model/pedido/order-details-dto';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  url = 'http://localhost:8000/print';
  http = inject(HttpClient);
  notifier =inject(NotificationService);

  ticketLine:string = "--------------------------------\n\n";
  ticketHeader:string = "REMITO DE ENTREGA\n\n";
  ticketSeparator:string = '[[cut]]\n';

  constructor() { }

  formatAndPrint(orders: OrderDetailsDto[]){
    if (!orders || orders.length === 0) return;

    let tickets = this.formatOrdersToTickets(orders);

    this.printTickets(tickets)

  }

  formatOrdersToTickets(orders: OrderDetailsDto[]){
    let tickets:string = "";

    let ticket = "";
    let ticketItems = "";

    orders.forEach(order => {
      ticketItems = "";
      let items = order.item;

      items.forEach(item => {
        ticketItems += `-${item.nombreProducto} x${item.cantidad}\n`;
      })

      ticket = this.ticketHeader;
      ticket += `Cliente: ${order.nombreCliente}\n`;
      ticket += `Dirección: ${order.direccionCliente}\n\n`;
      ticket+= this.ticketLine;
      ticket += `Items:\n${ticketItems}\n`;
      ticket += this.ticketLine;
      ticket += this.ticketSeparator;

      console.log(ticket)
      tickets += ticket;
    })

    return tickets;

  }

  printTickets(tickets:string){

    return this.http.post<string>(this.url, tickets, {
      headers: {'Content-Type': 'text/plain'},
    }).subscribe({
      next: ()=> {
        this.notifier.notifyInfo("Remitos Impresos Correctamente!");
      },
      error: (error)=> {
        throw error;
      }
    });
  }

}
