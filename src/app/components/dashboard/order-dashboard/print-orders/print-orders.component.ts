import {Component, inject, signal} from '@angular/core';
import {OrderService} from '../../../../services/order-service/order.service';
import {OrderDetailsDto} from '../../../../model/pedido/order-details-dto';
import {DeliveryDay} from '../../../../model/pedido/deliveryDay';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {PrinterService} from '../../../../services/printer-service/printer.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-print-orders',
  imports: [
    KeyValuePipe,
    MatButton,
    MatFormField,
    MatIcon,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
  ],
  templateUrl: './print-orders.component.html',
  styleUrl: './print-orders.component.css'
})
export class PrintOrdersComponent {

  orderService = inject(OrderService);
  printerService = inject(PrinterService);
  selectedDay:string = '';
  rawOrders = signal<OrderDetailsDto[]>([]);
  isLoading = signal<boolean>(false);

  protected readonly deliveryDay = DeliveryDay;

  getOrdersToPrint() {
    this.isLoading.set(true);

    this.orderService.getOrdersByDeliveryDay(this.selectedDay).pipe(
      finalize(()=> this.isLoading.set(false)))
      .subscribe({
        next: (data) => {
        this.rawOrders.set(data)
        console.log(this.rawOrders())
      },
        error: (error) => {
          throw error;
        }
      }
    )
  }

  printOrders(){
    this.printerService.formatAndPrint(this.rawOrders());
  }

}
