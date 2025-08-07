import {ProductOrderData} from './product-order-data';

export interface UpdateOrderDTO {

    idPedido:number;
    idCliente:number;
    items:ProductOrderData[];
    diaEntrega:string;


}
