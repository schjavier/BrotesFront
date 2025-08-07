import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {catchError, Observable, of} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {OrderService} from '../../../../services/order-service/order.service';
import {MatButton} from '@angular/material/button';
import {OrderDetailsDto} from '../../../../model/pedido/order-details-dto';
import {ItemPedidoDetailsDto} from '../../../../model/item-pedido/item-pedido-details-dto';
import {MatTooltip} from '@angular/material/tooltip';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-order-list',
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        MatIcon,
        MatButton,
        MatTooltip,
        RouterLink,

    ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

    orderList$!: Observable<OrderDetailsDto[] | null>;
    errorMessage:string | null = null;

    constructor(private orderService: OrderService) {
        this.orderList$ = of([]);

    }

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.errorMessage = null;

        this.orderList$ = this.orderService.getAllOrders().pipe(
            catchError(error => {
                this.errorMessage = error.message;
                console.error("Error cargando pedidos", error);
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
}
