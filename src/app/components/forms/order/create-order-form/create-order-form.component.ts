import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderService} from '../../../../services/order-service/order.service';
import {ClientService} from '../../../../services/client-service/client-service.service';
import {ProductService} from '../../../../services/product-service/product.service';
import {DeliveryDay} from '../../../../model/pedido/deliveryDay';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {SearchBarComponent} from '../../../search-bar/search-bar.component';
import {Observable} from 'rxjs';
import {Client} from '../../../../model/client/client';
import {DatosListaCliente} from '../../../../model/client/datos-lista-cliente';
import {DatosListaProducto} from '../../../../model/product/datos-lista-producto';
import {Product} from '../../../../model/product/product';
import {ItemPedidoDetailsDto} from '../../../../model/item-pedido/item-pedido-details-dto';
import {CreateOrderDto} from '../../../../model/pedido/create-order-dto';
import {MatIcon} from '@angular/material/icon';
import {MatChipListbox, MatChipRemove, MatChipRow} from '@angular/material/chips';

@Component({
  selector: 'app-create-order-form',
    imports: [
        ReactiveFormsModule,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        KeyValuePipe,
        NgForOf,
        SearchBarComponent,
        MatIcon,
        NgIf,
        MatChipListbox,
        MatChipRow,
        MatError,
        MatSuffix,
        MatChipRemove
    ],
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.css'
})
export class CreateOrderFormComponent {
    formTitle: string = "Cargar Pedido";

    errorMessage: string | null = null;

    deliveryDay = DeliveryDay


    selectedClient: DatosListaCliente | null = null;
    selectedProduct: DatosListaProducto | null = null;

    productQuantityControl:FormControl = new FormControl(1, [Validators.required]);

    createOrderForm: FormGroup = new FormGroup({
        idCliente: new FormControl({value: '', disabled: true}, [Validators.required]),
        nombreCliente: new FormControl({value: '', disabled: true}, [Validators.required]),
        items: new FormArray([], [Validators.required]),
        diaEntrega: new FormControl('', [Validators.required]),
    });

    popUp:MatSnackBar = new MatSnackBar();

    constructor(private orderService: OrderService,
                private productService: ProductService,
                private clientService: ClientService) {
    }

    getClientSuggestions = (searchTerm:string):Observable<DatosListaCliente[]> => {
        return this.clientService.getClientSuggestionByName(searchTerm);
    }

    displayClientSuggestion = (client:DatosListaCliente):string => {
        return client ? `${client.nombre} - (${client.id})` : '' }

    onClientSelected(selectedClient: DatosListaCliente):void {
        if(selectedClient) {
            this.selectedClient = selectedClient;
            this.createOrderForm.patchValue({
                idCliente: selectedClient.id,
                nombreCliente: selectedClient.nombre,

            });
            this.errorMessage = null;
        } else {
           this.selectedClient = null;
           this.createOrderForm.patchValue({
               idCliente: '',
               nombreCliente: '',
           });
        }
    }

    getProductSuggestions = (searchTerm:string):Observable<DatosListaProducto[]> => {
        return this.productService.getProductsSuggestionByName(searchTerm);
    }

    displayProductSuggestion = (product:DatosListaProducto):string => {
        return product ? `${product.nombre} - (${product.categoria})` : '';
    }

    onProductSelected (product:DatosListaProducto):void {
        this.selectedProduct = product;
        this.productQuantityControl.setValue(1);
    }

    get orderItems(): FormArray {
        return this.createOrderForm.get('items') as FormArray;
    }

    createOrderItemFormGroup(product?:DatosListaProducto, quantity?: number):FormGroup {
        return new FormGroup({
            idProducto: new FormControl(product ? product.id : '', Validators.required),
            nombreProducto: new FormControl(product ? product.nombre : '', Validators.required),
            categoria: new FormControl(product ? product.categoria : '', Validators.required),
            cantidad: new FormControl(quantity, [Validators.required, Validators.min(1)]),
            precioUnitario: new FormControl(product ? product.precio : '', Validators.required),
        })
    }

    addOrderItem():void{

        if (this.selectedProduct && this.productQuantityControl.valid){
            const quantity = this.productQuantityControl.value;
            this.orderItems.push(this.createOrderItemFormGroup(this.selectedProduct, quantity!));
            // this.selectedProduct = null;
            this.productQuantityControl.setValue(1);
            this.popUp.open(`"${this.selectedProduct!.nombre}" agregado`, "OK", {duration:2000});

        } else if (!this.selectedProduct) {
            this.popUp.open("Por Favor seleccione un producto para añadir", "Cerrar", {duration:2000});
        } else if (this.productQuantityControl.invalid){
            this.popUp.open("La cantidad debe ser al menos 1", "Cerrar", {duration:2000});
        }
    }

    removeOrderItem(index:number): void {
        const removedItemName = this.orderItems.at(index).get('nombreProducto')?.value;
        this.orderItems.removeAt(index);
        this.popUp.open(`"${removedItemName}" eliminado"`, "OK", {duration:2000});

    }

    createOrder():void{
        if(this.createOrderForm.valid){
            const itemsForDto: ItemPedidoDetailsDto[] = this.orderItems.controls.map(itemControl => {
                const item = itemControl.value;
                return {
                    id: item.idProducto,
                    nombreProducto: item.nombreProducto,
                    cantidad: item.cantidad,
                    precioProducto: item.precioUnitario
                }
            });

            const orderData: CreateOrderDto = {
                idCliente: this.selectedClient!.id,
                items: itemsForDto,
                diaEntrega: this.createOrderForm.get("diaEntrega")!.value
            };

            this.orderService.createOrder(orderData).subscribe({
                next: (response)=> {
                    console.log("pedido creado con exito: ", response);
                    this.popUp.open("Pedido Creado Con exito", "OK", {duration:2000});
                    this.createOrderForm.reset();
                    this.orderItems.clear();
                    this.selectedClient = null;
                    this.selectedProduct = null;

                },
                error: error => {
                    this.errorMessage = error.message || 'Error al crear el pedido.';
                    console.error(error);
                    this.popUp.open("Error al crear el pedido " + this.errorMessage, "Cerrar", {duration:2000});
                }
            });
        } else {
            this.errorMessage = "Complete todos los campos requeridos"
            this.createOrderForm.markAllAsTouched();
        }
    }

}
