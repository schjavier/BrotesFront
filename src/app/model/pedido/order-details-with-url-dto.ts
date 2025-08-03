import {Client} from '../client/client';
import {ItemPedido} from '../item-pedido/item-pedido';
import {ItemPedidoDetailsDto} from '../item-pedido/item-pedido-details-dto';

export interface OrderDetailsWithUrlDto {

    idPedido: number;
    idCliente: number;
    item: ItemPedidoDetailsDto[];
    precioTotal: number;
    fecha: string;
    diaDeEntrega: string;
    url:string;

}
