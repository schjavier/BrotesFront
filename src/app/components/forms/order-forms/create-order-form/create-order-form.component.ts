import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
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
import {DatosListaCliente} from '../../../../model/client/datos-lista-cliente';
import {DatosListaProducto} from '../../../../model/product/datos-lista-producto';
import {ItemPedidoDetailsDto} from '../../../../model/item-pedido/item-pedido-details-dto';
import {CreateOrderDto} from '../../../../model/pedido/create-order-dto';
import {MatIcon} from '@angular/material/icon';
import {MatChipListbox, MatChipRemove, MatChipRow} from '@angular/material/chips';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateOrderDTO} from '../../../../model/pedido/update-order-dto';
import {ProductOrderData} from '../../../../model/pedido/product-order-data';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-create-order-forms-form',
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
        MatChipRemove,
        MatCheckbox,
        FormsModule
    ],
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.css'
})
export class CreateOrderFormComponent implements OnInit {

   @ViewChild('itemsSearchBar')
    productSearchBar!: SearchBarComponent;

   @ViewChild('clientSearchBar')
   clientSearchBar!: SearchBarComponent;

    pedidoId:number | null = null;
    isEditing:boolean = false;

    errorMessage: string | null = null;

    deliveryDay = DeliveryDay

    selectedClient: DatosListaCliente | null = null;
    selectedProduct: DatosListaProducto | null = null;

    productQuantityControl:FormControl = new FormControl(1, [Validators.required]);

    createOrderForm: FormGroup = new FormGroup({
        idCliente: new FormControl({value: '', disabled: true}, [Validators.required]),
        nombreCliente: new FormControl({value: '', disabled: true}, [Validators.required]),
        item: new FormArray([], [Validators.required]),
        diaEntrega: new FormControl('', [Validators.required]),
        fijarPedido: new FormControl('')
    });

    popUp:MatSnackBar = new MatSnackBar();

    constructor(private orderService: OrderService,
                private productService: ProductService,
                private clientService: ClientService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id: string | null = params.get('id');
            if(id){
                this.isEditing = true;
                this.pedidoId = +id;
                this.loadOrderData(this.pedidoId);
            } else {
                this.isEditing = false;
                this.pedidoId = null;
                this.resetForm();
            }
        });

    }

    loadOrderData(id : number) :void {
        this.orderService.getOrderById(id).subscribe({
            next: (pedido) => {
                this.createOrderForm.patchValue({
                    idCliente: pedido.idCliente,
                    nombreCliente: pedido.nombreCliente,
                    diaEntrega: pedido.diaDeEntrega,
                });
                this.setOrderItems(pedido.item);
                this.createOrderForm.markAsDirty();
                this.createOrderForm.updateValueAndValidity();
            },
            error: (error) => {
                this.popUp.open('Error al cargar el pedido. ' + error.message, 'Cerrar', {duration:2000});
                this.router.navigate(['/dashboard/pedidos/listar'])
            }
        });
    }

    setOrderItems(items: ItemPedidoDetailsDto[]):void{
        this.orderItems.clear();

        items.forEach(  item => {
            const productData = {
                id: item.id,
                nombre: item.nombreProducto,
                categoria: item.categoria,
                activo: true // aca no iria esto.
            }
            this.orderItems.push(this.createOrderItemFormGroup(productData, item.cantidad))
        });
    }

    submitOrder():void{
        if(this.isEditing){
            this.updateOrder();
        } else {
            this.createOrder();
        }
    }

    updateOrder():void{
        if(this.createOrderForm.valid && this.pedidoId !== null){

            const formValues = this.createOrderForm.getRawValue();

            const itemsForDto: ProductOrderData[] = formValues.item.map((item:any) =>
                ({
                    id: item.idProducto,
                    cantidad: item.cantidad,
                }));

            const orderData:UpdateOrderDTO = {
                idPedido: this.pedidoId,
                idCliente: formValues.idCliente,
                items: itemsForDto,
                diaEntrega: formValues.diaEntrega
            };

            this.orderService.updateOrder(this.pedidoId, orderData).subscribe({
                next: () => {
                    console.error(orderData.idPedido, this.pedidoId);
                    console.log('Pedido Actualizado con Exito');
                    this.popUp.open('Pedido Actualizado', 'OK', {duration:2000})
                    this.router.navigate(['/dashboard/pedidos/listar']);
                },
                error: (error) => {
                    this.errorMessage = error.message || 'Error al actualizar el Pedido';
                    console.error('Error al actualizar el pedido: ', error);
                    this.popUp.open('Error actualizando el pedido', "OK", {duration:2000});
                }
            });
        } else {
            this.errorMessage = "Por favor Complete los campos del formulario"
            this.createOrderForm.markAllAsTouched();
            this.popUp.open(this.errorMessage, "Cerrar");
        }
    }

    getClientSuggestions = (searchTerm:string):Observable<DatosListaCliente[]> => {
        return this.clientService.getClientSuggestionByNameAndStatus(searchTerm);
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
        return this.productService.getProductsSuggestionByNameAndStatus(searchTerm);
    }

    displayProductSuggestion = (product:DatosListaProducto):string => {
        return product ? `${product.nombre} - (${product.categoria})` : '';
    }

    onProductSelected (product:DatosListaProducto):void {
        this.selectedProduct = product;
        this.productQuantityControl.setValue(1);
    }

    get orderItems(): FormArray {
        return this.createOrderForm.get('item') as FormArray;
    }

    createOrderItemFormGroup(product:DatosListaProducto, quantity: number = 1):FormGroup {
        return new FormGroup({
            idProducto: new FormControl(product ? product.id : '', Validators.required),
            nombreProducto: new FormControl(product ? product.nombre : '', Validators.required),
            categoria: new FormControl(product ? product.categoria : '', Validators.required),
            cantidad: new FormControl(quantity, [Validators.required, Validators.min(1)]),
            })
    }

    addOrderItem():void{

        if (this.selectedProduct && this.productQuantityControl.valid){
            const quantity = this.productQuantityControl.value;
            this.orderItems.push(this.createOrderItemFormGroup(this.selectedProduct, quantity!));
            this.productQuantityControl.setValue(1);
            this.popUp.open(`"${this.selectedProduct!.nombre}" agregado`, "OK", {duration:2000});

        } else if (!this.selectedProduct) {
            this.popUp.open("Por Favor seleccione un producto para añadir", "Cerrar", {duration:2000});
        } else if (this.productQuantityControl.invalid){
            this.popUp.open("La cantidad debe ser al menos 1", "Cerrar", {duration:2000});
        }

        this.selectedProduct = null;
        this.productSearchBar.searchControl.setValue('')
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
                    categoria: item.categoria
                }
            });

            const orderData: CreateOrderDto = {
                idCliente: this.selectedClient!.id,
                items: itemsForDto,
                diaEntrega: this.createOrderForm.get("diaEntrega")!.value,
                isRecurrent: this.createOrderForm.get("fijarPedido")?.value

            };

            this.orderService.createOrder(orderData).subscribe({
                next: (response)=> {

                    // todo => podria mostrar una parte del response en el el popup

                    console.log("pedido creado con exito: ", response);
                    this.popUp.open("Pedido Creado Con exito", "OK", {duration:2000});
                    this.resetForm();
                },
                error: error => {
                    //todo si nos saltamos el error handler (lo borramos del service) muestra el error correctamente
                    //
                    // this.errorMessage = error.error;
                    // console.error(this.errorMessage);
                    // this.popUp.open("Error al crear el pedido " + this.errorMessage, "Cerrar", {duration:5000});
                throw error;
                }
            });
        }
        else {
            this.errorMessage = "Complete todos los campos requeridos"
            this.createOrderForm.markAllAsTouched();
        }

        this.resetForm();
        this.clientSearchBar.searchControl.setValue('');

    }

    resetForm():void{
        this.createOrderForm.reset();
        this.orderItems.clear();
        this.selectedClient = null;
        this.selectedProduct = null;
        this.isEditing = false;
        this.pedidoId = null;

    }

}

