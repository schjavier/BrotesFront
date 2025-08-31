import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product/product';
import {catchError, map, Observable, of} from 'rxjs';
import {ProductService} from '../../../../services/product-service/product.service';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-list',
    imports: [
        NgFor,
        AsyncPipe,
        NgIf,
        MatIcon
    ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productList$!: Observable<Product[] | null>;
  errorMessage:string | null = null;
  isMobile:boolean = false;

  constructor(private productService: ProductService) {
    this.productList$ = of([]);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleDetails(product:Product):void{
      this.isMobile = window.innerWidth <= 576;

      if (this.isMobile) {

          product.isExpanded = !product.isExpanded;

      } else {
          product.isExpanded = false;
      }
  }

  loadProducts(): void {
    this.errorMessage = null;

    this.productList$ = this.productService.getAllProducts().pipe(
        map(products => products.map(product => ({...product, isExpanded: false}))
        ),
      catchError(error => {
        this.errorMessage = error.message;
        console.error('error al cargar productos: ', error);
        return of(null);
      })
    );
  }

}
