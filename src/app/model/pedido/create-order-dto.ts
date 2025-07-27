import {ItemPedido} from '../item-pedido/item-pedido';

export interface CreateOrderDto {

    idCliente: number;
    items: ItemPedido[];
    diaEntrega:string;

}
