import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product/product';
import {catchError, Observable, of} from 'rxjs';
import {ProductService} from '../../../../services/product-service/product.service';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [
    NgFor,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productList$!: Observable<Product[] | null>;
  errorMessage:string | null = null;


  constructor(private productService: ProductService) {
    this.productList$ = of([]);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.errorMessage = null;

    this.productList$ = this.productService.getAllProducts().pipe(
      catchError(error => {
        this.errorMessage = error.message;
        console.error('error al cargar productos: ', error);
        return of(null);
      })
    );
  }

}
