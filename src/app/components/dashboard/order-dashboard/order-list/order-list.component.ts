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
    ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

    orderService = inject(OrderService);
    dialog = inject(MatDialog);

    orderList = signal<OrderDetailsDto[] | null>(null);
    errorMessage: string | null = null;
    isMobile: boolean = false;
    totalItems: number = 0;
    currentPage: number = 0;

    currentSort: Sort = {active: 'fecha', direction: 'asc'}

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
            `${this.currentSort.active},${this.currentSort.direction}` : 'fecha,asc' ;

        this.orderService.getAllUndeliveredOrders(this.currentPage, sortParam).pipe(
            tap(response => this.totalItems = response.totalElements
            ),
            map(orders => orders.content.map(order => ({...order, isExpanded: false}))
            ),
            catchError(error => {
                this.errorMessage = error.error;
                console.error("Error cargando pedidos", this.errorMessage);
                this.orderList.set(null);
                return of(null);
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
            this.currentSort = {active: 'fecha', direction: 'asc'}
        }

        this.currentPage = 0;
        this.loadOrders();

    }


}
