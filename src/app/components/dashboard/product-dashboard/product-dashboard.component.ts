import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-product-dashboard',
  imports: [
    RouterOutlet
  ],
  templateUrl: './product-dashboard.component.html',
  styleUrl: './product-dashboard.component.css'
})
export class ProductDashboardComponent {

  titulo:string = "Tablero de Productos";
  

}
