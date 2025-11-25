import {Component, inject, OnInit} from '@angular/core';
import {Product} from '../../../../model/product/product';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {ProductService} from '../../../../services/product-service/product.service';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NotificationService} from '../../../../services/notification-service/notification.service';

@Component({
  selector: 'app-product-list',
    imports: [
        NgFor,
        AsyncPipe,
        NgIf,
        MatIcon,
        MatPaginator
    ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  productList$!: Observable<Product[] | null>;
  isMobile:boolean = false;

  totalItems = 0;
  currentPage = 0;

  notifier = inject(NotificationService);
  productService = inject(ProductService);

  constructor() {
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

    this.productList$ = this.productService.getAllProducts(this.currentPage).pipe(
        tap(response =>  this.totalItems = response.totalElements),
        map(products => products.content.map(product => ({...product, isExpanded: false}))
        ),
      catchError( () => {
         this.notifier.notifyError("Error cargando Productos", 2000);
         return of([]);
      })
    );
  }


    onChangePage($event: PageEvent) {
        this.currentPage = $event.pageIndex;

        this.loadProducts();

    }

}
