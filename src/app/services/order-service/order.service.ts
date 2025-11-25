import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {OrderDetailsWithUrlDto} from '../../model/pedido/order-details-with-url-dto';
import {Observable} from 'rxjs';
import {CreateOrderDto} from '../../model/pedido/create-order-dto';
import {UpdateOrderDTO} from '../../model/pedido/update-order-dto';
import {OrderDetailsDto} from '../../model/pedido/order-details-dto';
import {ProductionSheet} from '../../model/production-sheet/production-sheet';
import { environment } from '../../../environments/environment';
import {OrderResponse} from '../../model/pedido/order-response';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

    http = inject(HttpClient)

    constructor() {}

    url:string = `${environment.apiUrl}/pedidos`;

    getAllUndeliveredOrders(pageNumber:number, sort:string):Observable<OrderResponse>{

        let params = new HttpParams()
            .set('page', pageNumber.toString())
            .set('size', '10')
            .set('sort', sort);

        return this.http.get<OrderResponse>(`${this.url}/all/undelivered`, {params});

    }

    createOrder(orderData:CreateOrderDto):Observable<OrderDetailsWithUrlDto>{
        return this.http.post<OrderDetailsWithUrlDto>(this.url, orderData);
    }

    updateOrder(orderId:number, orderData:UpdateOrderDTO):Observable<OrderDetailsDto>{
        return this.http.put<OrderDetailsDto>(this.url + "/" + orderId, orderData);
    }

    //not implemented yet
    deleteOrder(idOrder:number):Observable<OrderDetailsDto>{
        return this.http.delete<OrderDetailsDto>(this.url + "/" + idOrder);
    }

    getOrderById(idOrder:number):Observable<OrderDetailsDto>{
        return this.http.get<OrderDetailsDto>(this.url + "/" + idOrder);
    }

    //not implemented yet
    getOrderByDeliveryDay(deliveryDay:string):Observable<OrderDetailsDto>{
        return this.http.get<OrderDetailsDto>(this.url + "/buscar?dia=" + deliveryDay);
    }

    getProductionSheetByDay(deliveryDay:string):Observable<ProductionSheet[]>{
        return this.http.get<ProductionSheet[]>(this.url + "/generar/planilla?dia=" + deliveryDay.toUpperCase());
    }

}
