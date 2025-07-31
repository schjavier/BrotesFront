import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Pedido} from '../../../../model/pedido/pedido';
import {catchError, Observable, of} from 'rxjs';
import {MatIcon} from '@angular/material/icon';
import {OrderService} from '../../../../services/order-service/order.service';
import {MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {OrderDetailsDto} from '../../../../model/pedido/order-details-dto';
import {ItemPedidoDetailsDto} from '../../../../model/item-pedido/item-pedido-details-dto';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-order-list',
    imports: [
        AsyncPipe,
        NgForOf,
        NgIf,
        MatIcon,
        MatButton,
        MatTooltip,

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
        if (!items || items.length === 0) {
            return 'No hay items en este pedido';
        }
        return items.map(item =>
            `${item.nombreProducto} (x${item.cantidad})`).join('\n');
    }
}
