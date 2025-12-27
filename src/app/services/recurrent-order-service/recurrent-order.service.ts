import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OrderResponse} from '../../model/pedido/order-response';
import { Observable } from 'rxjs';
import {OrderDetailsDto} from '../../model/pedido/order-details-dto';
import {UpdateOrderDTO} from '../../model/pedido/update-order-dto';

@Injectable({
  providedIn: 'root'
})
export class RecurrentOrderService {

  http= inject(HttpClient);

  constructor() { }

  url:string = `${environment.apiUrl}/pedidos-recurrentes`;

  getAllRecurrents(pageNumber:number, sort:string): Observable<OrderResponse>{

    let params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', '10')
      .set('sort', sort);

    return this.http.get<OrderResponse>(this.url, {params})
  }

  getRecurrentOrderById(id:number):Observable<OrderDetailsDto>{
    return this.http.get<OrderDetailsDto>(`${this.url}/${id}`);
  }

  updateRecurrentOrder(orderId:number, orderData:UpdateOrderDTO):Observable<OrderDetailsDto>{
    return this.http.put<OrderDetailsDto>(this.url + "/" + orderId, orderData);
  }

  deleteOrder(idOrder:number):Observable<OrderDetailsDto>{
    return this.http.delete<OrderDetailsDto>(this.url + "/" + idOrder);
  }


}
