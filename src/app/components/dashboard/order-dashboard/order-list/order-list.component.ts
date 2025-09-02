import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {catchError, map, Observable, of, tap} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {OrderService} from '../../../../services/order-service/order.service';
import {MatButton} from '@angular/material/button';
import {OrderDetailsDto} from '../../../../model/pedido/order-details-dto';
import {ItemPedidoDetailsDto} from '../../../../model/item-pedido/item-pedido-details-dto';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-order-forms-list',
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        MatIcon,
        MatButton,
        MatTooltip,
        RouterLink,
        MatPaginator,

    ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

    orderList$!: Observable<OrderDetailsDto[] | null>;
    errorMessage:string | null = null;
    isMobile:boolean = false;
    totalItems:number = 0;
    currentPage:number = 0;

    constructor(private orderService: OrderService) {
        this.orderList$ = of([]);
    }

    ngOnInit() {
        this.loadOrders();
    }

    toggleDetails(order:OrderDetailsDto):void{
        this.isMobile = window.innerWidth < 576;

        if(this.isMobile){
            order.isExpanded = !order.isExpanded;
        } else {
            order.isExpanded = false;
        }
    }

    loadOrders() {
        this.errorMessage = null;

        this.orderList$ = this.orderService.getAllUndeliveredOrders(this.currentPage).pipe(
            tap(response => this.totalItems = response.totalElements
            ),
            map(orders => orders.content.map(order => ({...order, isExpanded: false}))
            ),
            catchError(error => {
                this.errorMessage = error.message;
                console.error("Error cargando pedidos", this.errorMessage);
                return of(null);
            })
        )
    }

    formatItemsForTooltip(items: ItemPedidoDetailsDto[]):string {
        console.log(items);
        if (!items || items.length === 0) {
            return 'No hay items en este pedido';
        }
        return items.map(item =>
            `${item.nombreProducto} (x${item.cantidad})`).join('\n');
    }

    onChangePage($event: PageEvent) {
        this.currentPage = $event.pageIndex;

        this.loadOrders()

    }
}
