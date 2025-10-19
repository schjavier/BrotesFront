import {ItemPedidoDetailsDto} from '../item-pedido/item-pedido-details-dto';

export interface OrderDetailsDto {

    idPedido:number;
    idCliente:number;
    nombreCliente:string;
    item:ItemPedidoDetailsDto[];
    fecha:string;
    diaDeEntrega:string;
    isExpanded?: boolean;
    totalElements?:number;

}
