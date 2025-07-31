import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-order-dashboard',
    imports: [
        RouterOutlet
    ],
  templateUrl: './order-dashboard.component.html',
  styleUrl: './order-dashboard.component.css'
})
export class OrderDashboardComponent {

    titulo:string = "Tablero de Pedidos";



}
