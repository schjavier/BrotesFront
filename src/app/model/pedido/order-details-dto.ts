import {ItemPedidoDetailsDto} from '../item-pedido/item-pedido-details-dto';

export interface OrderDetailsDto {

    idPedido:number;
    idCliente:number;
    nombreCliente:string;
    items:ItemPedidoDetailsDto[];
    precioTotal:number;
    fecha:string;
    diaDeEntrega:string;

}
