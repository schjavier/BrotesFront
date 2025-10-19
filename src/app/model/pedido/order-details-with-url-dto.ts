import {ItemPedidoDetailsDto} from '../item-pedido/item-pedido-details-dto';

export interface OrderDetailsWithUrlDto {

    idPedido: number;
    idCliente: number;
    item: ItemPedidoDetailsDto[];
    fecha: string;
    diaDeEntrega: string;
    url:string;

}
