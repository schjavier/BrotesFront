import {inject, Injectable} from '@angular/core';
import {OrderDetailsDto} from '../../model/pedido/order-details-dto';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from '../notification-service/notification.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrinterService {

  url = 'http://localhost:8000/print';
  http = inject(HttpClient);
  notifier = inject(NotificationService);


  private readonly PAPER_WIDTH = 48;

  ticketLine:string = '-'.repeat(this.PAPER_WIDTH) + '\n\n';
  ticketCompanyName = 'BROTES'
  ticketHeader:string = "REMITO";
  ticketSeparator:string = '[[CUT]]\n';
  ticketOpenBoldTag:string = '[[B]]';
  ticketCloseBoldTag:string = '[[/B]]';
  ticketOpenLargeFontTag:string = '[[L]]';
  ticketCloseLargeFontTag:string = '[[/L]]';
  tickerOpenCenterTextTag:string = '[[C]]';
  tickerCloseCenterTextTag:string = '[[/C]]';
  ticketDate: string = '';

  constructor() {
    const actualDate = new Date();
    this.ticketDate = actualDate.toISOString().split('T')[0].split('-').reverse().join('-');
  }

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
      let totalItems:number = 0;

      items.forEach(item => {
        const rightTxt = `- ${item.nombreProducto}`
        const leftTxt = `x ${item.cantidad}`

        ticketItems += this.justifyText(rightTxt, leftTxt);
        totalItems++;
      })

      ticket = this.tickerOpenCenterTextTag
                + this.ticketOpenLargeFontTag
                + this.ticketCompanyName
                + this.ticketCloseLargeFontTag
                +'\n';

      ticket += this.ticketHeader + this.tickerCloseCenterTextTag + '\n';
      ticket += `Fecha: ${this.ticketOpenBoldTag}${this.ticketDate}${this.ticketCloseBoldTag}\n`;
      ticket += `Cliente: ${this.ticketOpenBoldTag}${order.nombreCliente}${this.ticketCloseBoldTag}\n`;
      ticket += `Dirección: ${this.ticketOpenBoldTag}${order.direccionCliente}${this.ticketCloseBoldTag}\n\n`;
      ticket += this.ticketLine;
      ticket += `${this.ticketOpenBoldTag}Items:${this.ticketCloseBoldTag}\n${ticketItems}\n`;
      ticket += this.ticketLine;
      ticket += this.justifyText(`Items Total:`, `${totalItems}`);
      ticket += this.ticketSeparator;

      console.log(ticket);
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

  private justifyText(rightText:string, leftText:string){
    const maxLeftLength = this.PAPER_WIDTH - rightText.length -1;

    let finalLeft = leftText;
    if(finalLeft.length > maxLeftLength){
      finalLeft = finalLeft.substring(0, maxLeftLength);
    }

    const spacesNeeded = this.PAPER_WIDTH - finalLeft.length - rightText.length;
    const spaces = ' '.repeat(Math.max(0, spacesNeeded));

    return rightText + spaces + finalLeft + '\n';
  }


}
