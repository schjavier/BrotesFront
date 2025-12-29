import {Component,inject, signal} from '@angular/core';
import {DatePipe} from "@angular/common";
import {catchError, map, of, tap} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {OrderService} from '../../../../services/order-service/order.service';
import {MatButton} from '@angular/material/button';
import {OrderDetailsDto} from '../../../../model/pedido/order-details-dto';
import {ItemPedidoDetailsDto} from '../../../../model/item-pedido/item-pedido-details-dto';
import {RouterLink} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../dialog/dialog.component';
import {MatSort, MatSortHeader, Sort} from '@angular/material/sort';
import {NotificationService} from '../../../../services/notification-service/notification.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {RecurrentOrderService} from '../../../../services/recurrent-order-service/recurrent-order.service';

@Component({
  selector: 'app-order-forms-list',
  imports: [

    MatIcon,
    MatButton,
    RouterLink,
    MatPaginator,
    MatSort,
    MatSortHeader,
    DatePipe,
    MatSlideToggle,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

    orderService = inject(OrderService);
    recurrentOrderService = inject(RecurrentOrderService);
    dialog = inject(MatDialog);
    notifier = inject(NotificationService);

    showRecurrent = signal<boolean>(false);
    orderList = signal<OrderDetailsDto[] | null>(null);
    errorMessage: string | null = null;
    isMobile: boolean = false;
    totalItems: number = 0;
    currentPage: number = 0;
    currentSort: Sort = {active: 'cliente', direction: 'asc'}

    constructor() {
        this.loadOrders();
    }

    toggleDetails(order: OrderDetailsDto): void {
        this.isMobile = window.innerWidth < 576;

        if (this.isMobile) {
            order.isExpanded = !order.isExpanded;
        } else {
            order.isExpanded = false;
        }
    }

    loadOrders() {
        this.errorMessage = null;

        const sortParam = this.currentSort.active && this.currentSort.direction?
            `${this.currentSort.active},${this.currentSort.direction}` : 'cliente,asc' ;

        if (this.showRecurrent()){

          this.getRecurrentOrders(sortParam);

        } else {

          this.getOrders(sortParam)
        }
    }

    getOrders(sortParam:string){

      this.orderService.getAllUndeliveredOrders(this.currentPage, sortParam).pipe(
        tap(response => this.totalItems = response.totalElements
        ),
        map(orders => orders.content.map(order => ({...order, isExpanded: false}))
        ),
        catchError( () => {
          this.notifier.notifyError("Error Cargando Pedidos", 2000);
          this.orderList.set(null);
          return of([]);
        })
      ).subscribe(
        orders => {
          if (orders) {
            this.orderList.set(orders);
          }
        }
      )
    }

    getRecurrentOrders(sortParam:string){
      this.recurrentOrderService.getAllRecurrents(this.currentPage, sortParam).pipe(
        tap(response => this.totalItems = response.totalElements
        ),
        map(orders => orders.content.map(order => ({...order, isExpanded: false}))
        ),
        catchError( () => {
          this.notifier.notifyError("Error Cargando Pedidos", 2000);
          this.orderList.set(null);
          return of([]);
        })
      ).subscribe(
        orders => {
          if (orders) {
            this.orderList.set(orders);
          }
        }
      )
    }

    showItems(items: ItemPedidoDetailsDto[]): void {

        const stringItems = items.map(item =>
            `${item.nombreProducto} (x${item.cantidad})`).join('\n');

        this.dialog.open(DialogComponent, {
            width: '25%',
            data: {items: stringItems},
        })
    }

    onChangePage($event: PageEvent) {
        this.currentPage = $event.pageIndex;
        this.loadOrders()
    }

    sortData(sort: Sort) {
        this.currentSort = sort;

        if(!sort.active || sort.direction === '' ) {
            this.currentSort = {active: 'cliente', direction: 'asc'}
        }

        this.currentPage = 0;
        this.loadOrders();
    }


  toggleRecurrents() {

      if(this.showRecurrent()){
        this.showRecurrent.set(false);
        this.loadOrders();
    } else {
        this.showRecurrent.set(true);
        this.loadOrders();
      }
  }

  handleDeleteOrder(orderId: number) {
      if (this.showRecurrent()){
        this.recurrentOrderService.deleteOrder(orderId).subscribe({
          next: () => { this.notifier.notifyInfo("Pedido Fijo borrado con exito");
          }, error: err =>  {
            throw err;
          }, complete: () => {
            this.loadOrders();
          }
        });
      } else {
        this.orderService.deleteOrder(orderId).subscribe({
          next: () => { this.notifier.notifyInfo("Pedido Semanal borrado con exito");
          }, error: err =>  {
            throw err;
          }, complete: () => {
            this.loadOrders();
          }
        });
      }
  }

}
