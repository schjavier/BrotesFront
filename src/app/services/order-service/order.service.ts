import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ErrorHandlerService} from '../error-handler-service/error-handler.service';
import {OrderDetailsWithUrlDto} from '../../model/pedido/order-details-with-url-dto';
import {catchError, map, Observable} from 'rxjs';
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

  constructor(
      private http: HttpClient,
      private errorHandler: ErrorHandlerService) {}


    url:string = `${environment.apiUrl}/pedidos`;

    getAllUndeliveredOrders(pageNumber:number, sort:string):Observable<OrderResponse>{

        let params = new HttpParams()
            .set('page', pageNumber.toString())
            .set('size', '10')
            .set('sort', sort);

        return this.http.get<OrderResponse>(`${this.url}/all/undelivered`, {params}).pipe(
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

    //not implemented yet
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

    //not implemented yet
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
