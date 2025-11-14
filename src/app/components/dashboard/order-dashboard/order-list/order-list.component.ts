import {Component, inject, signal} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {catchError, map, Observable, of, tap} from 'rxjs';
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
        NgForOf,
        NgIf,
        MatIcon,
        MatButton,
        RouterLink,
        MatPaginator,
        MatSort,
        MatSortHeader,
    ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent{

    orderService = inject(OrderService);
    dialog = inject(MatDialog);

    orderList$!: Observable<OrderDetailsDto[] | null>;
    orderList = signal<OrderDetailsDto[] | null>(null);
    errorMessage:string | null = null;
    isMobile:boolean = false;
    totalItems:number = 0;
    currentPage:number = 0;

    constructor() {
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

       this.orderService.getAllUndeliveredOrders(this.currentPage).pipe(
            tap(response => this.totalItems = response.totalElements
            ),
            map(orders => orders.content.map(order => ({...order, isExpanded: false}))
            ),
            catchError(error => {
                this.errorMessage = error.message;
                console.error("Error cargando pedidos", this.errorMessage);
                this.orderList.set(null);
                return of(null);
            })
        ).subscribe(
            orders => {
                if(orders){
                    this.orderList.set(orders);
                }
            }
       )
    }

    showItems(items: ItemPedidoDetailsDto[]):void {

        const stringItems = items.map( item =>
            `${item.nombreProducto} (x${item.cantidad})`).join('\n');

        this.dialog.open(DialogComponent, {
            width: '25%',
            data: { items: stringItems },
        })
    }

    onChangePage($event: PageEvent) {
        this.currentPage = $event.pageIndex;

        this.loadOrders()

    }

    sortData(sort: Sort) {
        const data = this.orderList();

        if(!data || !sort.active || sort.direction === ''){
            this.loadOrders();
            return ;
        }

        this.orderList.update(currentData => {
            return currentData!.slice()
                    .sort((a, b) => {
                        const isAsc = sort.direction === 'asc';
                        switch (sort.active) {
                            case 'deliveryDay':
                                return this.compare(a.diaDeEntrega, b.diaDeEntrega, isAsc);
                            default: return 0;
                        }
                    });
        })
    }

    private compare(diaDeEntrega: string, diaDeEntrega2: string, isAsc: boolean) {
        if(diaDeEntrega < diaDeEntrega2){
            return isAsc ? -1 : 1;

        }
        if(diaDeEntrega > diaDeEntrega2){
            return isAsc ? 1 : -1;
        }

        return 0;
    }
}
