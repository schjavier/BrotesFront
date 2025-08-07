import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product/product';
import {catchError, map, Observable} from 'rxjs';
import {ErrorHandlerService} from '../error-handler-service/error-handler.service';
import {CreateProductDTO} from '../../model/product/create-product-dto';
import {UpdateProductDTO} from '../../model/product/update-product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    private errorHandler:ErrorHandlerService
  ) {
  }

  status:string = "true";
  url:string = "http://localhost:8080/productos";

  getAllProducts():Observable<Product[]>{
    return this.http.get<any>(this.url).pipe(
      map(response => response.content)).pipe
    (catchError(error => this.errorHandler.handleHttpError(error)));
  }

  createProduct(productData:CreateProductDTO):Observable<Product>{
    return this.http.post<Product>(this.url, productData).pipe(
      catchError(error => this.errorHandler.handleHttpError(error))
    )
  }

  updateProduct(updateProductData:UpdateProductDTO):Observable<Product>{
    return this.http.put<Product>(this.url, updateProductData).pipe(
      catchError(error => this.errorHandler.handleHttpError(error))
    )
  }

  activateProduct(idProduct:number):Observable<Product>{
    return this.http.patch<Product>(this.url + "/" + idProduct.toString() + "/activar", {}).pipe(
      catchError(error => this.errorHandler.handleHttpError(error))
    )
  }

  deactivateProduct(idProduct:number):Observable<Product>{
    return this.http.patch<Product>(this.url + "/" + idProduct.toString() + "/desactivar", {}).pipe(
      catchError(error => this.errorHandler.handleHttpError(error))
    )
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(this.url + "/" + id).pipe(
      catchError(error => this.errorHandler.handleHttpError(error)));
  }

  getProductByName(name: string):Observable<Product> {
    return this.http.get<Product>(this.url + "/" + name).pipe(
      catchError(error => this.errorHandler.handleHttpError(error))
    );
  }

  deleteProduct(id:number):Observable<Product>{
    return this.http.delete<Product>(this.url + "/" + id).pipe(
      catchError(error => this.errorHandler.handleHttpError(error))
    )
  }

    getProductsSuggestionByName(nombre: string):Observable<Product[]> {
        return this.http.get<Product[]>(this.url + "/buscar?nombre=" + nombre).pipe(
            catchError(error => this.errorHandler.handleHttpError(error))
        )
    }
    getProductsSuggestionByNameAndStatus(nombre: string):Observable<Product[]> {
        return this.http.get<Product[]>(this.url + "/buscar?nombre=" + nombre + "&status=" + this.status).pipe(
            catchError(error => this.errorHandler.handleHttpError(error))
        )
    }
}
