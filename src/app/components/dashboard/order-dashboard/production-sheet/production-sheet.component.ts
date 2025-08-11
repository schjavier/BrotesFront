import { Component } from '@angular/core';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {DeliveryDay} from '../../../../model/pedido/deliveryDay';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {OrderService} from '../../../../services/order-service/order.service';
import {ProductionSheet} from '../../../../model/production-sheet/production-sheet';
import {ItemProductionSheet} from '../../../../model/production-sheet/item-production-sheet';
import {CdkCopyToClipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {finalize} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';

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
        MatIcon,
        MatProgressSpinner
    ],
  templateUrl: './production-sheet.component.html',
  styleUrl: './production-sheet.component.css'
})
export class ProductionSheetComponent {

    selectedDay:string = "";
    productionSheetData:ProductionSheet[] | null = null;
    errorMessage:string | null = null;
    isLoading:boolean = false;
    totals:Map<string, number> = new Map<string, number>();

    constructor(private orderService:OrderService, private popUp:MatSnackBar) {
    }

    fetchProductionSheet():void{
        if (!this.selectedDay){
            this.popUp.open('Por favor ingrese un dia...', 'Cerrar', {duration:2000});
            return;
        }

        this.isLoading = true;
        this.productionSheetData = null;
        this.totals.clear();

        this.orderService.getProductionSheetByDay(this.selectedDay).pipe(
            finalize(() => this.isLoading = false))
            .subscribe({
            next: (data:ProductionSheet[]) => {
                this.productionSheetData = data;
                this.totals = this.getTotalByCategory(data);
                if(this.productionSheetData.length === 0){
                    this.popUp.open('No hay pedidos cargados para el dia seleccionado', 'Cerrar', {duration:2000});
                }
            },
                error: (error) => {
                this.errorMessage = error.message;
                console.error("Error generando la lista de produccion: ", error);
                this.popUp.open('Error al generar la planilla: '+ (error.message || 'Error desconocido'), 'Cerrar', {duration:2000});
            }
        });

    }

    getTotalByCategory(productionSheet:ProductionSheet[]):Map<string, number>{
        let result:Map<string, number> = new Map<string, number>;
        // let counts: number = 0;
        // let category:string = "";

        productionSheet.forEach(sheet => {
            const totalCount = sheet.items.reduce((sum, item) => sum + item.cantidad, 0);
            result.set(sheet.categoria, totalCount);
        });
        return result;

    }

    protected readonly deliveryDay = DeliveryDay;
}
