import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorHandlerService} from '../error-handler-service/error-handler.service';
import {OrderDetailsWithUrlDto} from '../../model/pedido/order-details-with-url-dto';
import {catchError, map, Observable} from 'rxjs';
import {CreateOrderDto} from '../../model/pedido/create-order-dto';
import {UpdateOrderDTO} from '../../model/pedido/update-order-dto';
import {OrderDetailsDto} from '../../model/pedido/order-details-dto';
import {ProductionSheet} from '../../model/production-sheet/production-sheet';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
      private http: HttpClient,
      private errorHandler: ErrorHandlerService) {}

    url:string = `${environment.apiUrl}/pedidos`;

    getAllOrders():Observable<OrderDetailsDto[]>{
        return this.http.get<any>(this.url + "/all").pipe(
            map(response => response.content)).pipe(
                catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    getAllUndeliveredOrders():Observable<OrderDetailsDto[]>{
        return this.http.get<any>(this.url + "/all/undelivered").pipe(
            map(response => response.content)).pipe(
                catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    createOrder(orderData:CreateOrderDto):Observable<OrderDetailsWithUrlDto>{
        return this.http.post<OrderDetailsWithUrlDto>(this.url, orderData).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

    updateOrder(orderId:number, orderData:UpdateOrderDTO):Observable<OrderDetailsDto>{
        return this.http.put<OrderDetailsDto>(this.url + "/" + orderId, orderData).pipe(
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

    getProductionSheetByDay(deliveryDay:string):Observable<ProductionSheet[]>{
        return this.http.get<ProductionSheet[]>(this.url + "/generar/planilla?dia=" + deliveryDay.toUpperCase()).pipe(
            catchError(error => this.errorHandler.handleHttpError(error()))
        )
    }

}
