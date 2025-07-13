import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product/product';
import {catchError, Observable} from 'rxjs';
import {ErrorHandlerService} from '../error-handler-service/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    private errorHandler:ErrorHandlerService
  ) {
  }

  url:string = "http://localhost:8080/productos";

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(this.url + "/" + id).pipe(
      catchError(error => this.errorHandler.handleHttpError(error)));
  }



}
