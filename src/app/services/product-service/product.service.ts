import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../model/product/product';
import {Observable} from 'rxjs';
import {CreateProductDTO} from '../../model/product/create-product-dto';
import {UpdateProductDTO} from '../../model/product/update-product-dto';
import {environment} from '../../../environments/environment';
import {ProductResponse} from '../../model/product/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(
    private http:HttpClient) {
  }

  status:string = "true";
  url:string = `${environment.apiUrl}/productos`;

  getAllProducts(pageNumber:number):Observable<ProductResponse>{
    return this.http.get<any>(this.url + "?page=" + pageNumber);
  }

  createProduct(productData:CreateProductDTO):Observable<Product>{
    return this.http.post<Product>(this.url, productData);
  }

  updateProduct(updateProductData:UpdateProductDTO):Observable<Product>{
    return this.http.put<Product>(this.url, updateProductData);
  }

  activateProduct(idProduct:number):Observable<Product>{
    return this.http.patch<Product>(this.url + "/" + idProduct.toString() + "/activar", {});
  }

  deactivateProduct(idProduct:number):Observable<Product>{
    return this.http.patch<Product>(this.url + "/" + idProduct.toString() + "/desactivar", {});
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(this.url + "/" + id);
  }

  getProductByName(name: string):Observable<Product> {
    return this.http.get<Product>(this.url + "/" + name);
  }

  deleteProduct(id:number):Observable<Product>{
    return this.http.delete<Product>(this.url + "/" + id);
  }

    getProductsSuggestionByName(nombre: string):Observable<Product[]> {
        return this.http.get<Product[]>(this.url + "/buscar?nombre=" + nombre);
    }
    getProductsSuggestionByNameAndStatus(nombre: string):Observable<Product[]> {
        return this.http.get<Product[]>(this.url + "/buscar?nombre=" + nombre + "&status=" + this.status);
    }
}
