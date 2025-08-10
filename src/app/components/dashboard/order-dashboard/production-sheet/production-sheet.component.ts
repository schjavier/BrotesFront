import { Component } from '@angular/core';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {DeliveryDay} from '../../../../model/pedido/deliveryDay';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {OrderService} from '../../../../services/order-service/order.service';
import {ProductionSheet} from '../../../../model/production-sheet/production-sheet';
import {ItemProductionSheet} from '../../../../model/production-sheet/item-production-sheet';
import {CdkCopyToClipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-production-sheet',
    imports: [
        MatSelect,
        MatOption,
        MatFormField,
        KeyValuePipe,
        NgForOf,
        MatButton,
        NgIf,
        CdkCopyToClipboard
    ],
  templateUrl: './production-sheet.component.html',
  styleUrl: './production-sheet.component.css'
})
export class ProductionSheetComponent {

    selectedDay:string = "";
    productionSheetData:ProductionSheet[] | null = null;
    errorMessage:string | null = null;
    totals:Map<string, number> = new Map<string, number>();

    constructor(private orderService:OrderService) {
    }

    fetchProductionSheet():void{
        this.orderService.getProductionSheetByDay(this.selectedDay).subscribe({
            next: (data:ProductionSheet[]) => {
                this.productionSheetData = data;
                this.totals = this.getTotalByCategory(data);
            }, error: (error) => {
                this.errorMessage = error.message;
                console.error("Error generando la lista de produccion: ", error);
            }
        });

    }

    getTotalByCategory(productionSheet:ProductionSheet[]):Map<string, number>{
        let counts: number = 0;
        let category:string = "";
        let result:Map<string, number> = new Map<string, number>;

        productionSheet.forEach(sheet => {
            category = sheet.categoria;
            sheet.items.forEach(item => {
                counts += item.cantidad;
            });
        result.set(category, counts);
        category = "";
        counts = 0;
        });

        return result;

    }

    protected readonly deliveryDay = DeliveryDay;
}
