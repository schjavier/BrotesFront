import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../error-handler-service/error-handler.service';
import {OrderDetailsWithUrlDto} from '../../model/pedido/order-details-with-url-dto';
import {catchError, map, Observable} from 'rxjs';
import {CreateOrderDto} from '../../model/pedido/create-order-dto';
import {UpdateOrderDTO} from '../../model/pedido/update-order-dto';
import {OrderDetailsDto} from '../../model/pedido/order-details-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private http: HttpClient,
      private errorHandler: ErrorHandlerService) {}

    url:string = "http://localhost:8080/pedidos";

    getAllOrders():Observable<OrderDetailsDto[]>{
        return this.http.get<any>(this.url + "/all").pipe(
            map(response => response.content)).pipe(
                catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    createOrder(orderData:CreateOrderDto):Observable<OrderDetailsWithUrlDto>{
        return this.http.post<OrderDetailsWithUrlDto>(this.url, orderData).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    updateOrder(orderData:UpdateOrderDTO):Observable<OrderDetailsDto>{
        return this.http.put<OrderDetailsDto>(this.url, orderData).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    deleteOrder(idOrder:number):Observable<OrderDetailsDto>{
        return this.http.delete<OrderDetailsDto>(this.url + "/" + idOrder).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    getOrderById(idOrder:number):Observable<OrderDetailsDto>{
        return this.http.get<OrderDetailsDto>(this.url + "/" + idOrder).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    getOrderByDeliveryDay(deliveryDay:string):Observable<OrderDetailsDto>{
        return this.http.get<OrderDetailsDto>(this.url + "/buscar?dia=" + deliveryDay).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

}
