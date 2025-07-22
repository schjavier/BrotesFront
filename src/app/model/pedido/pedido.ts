import {Client} from '../client/client';
import {ItemPedido} from '../item-pedido/item-pedido';

export interface Pedido{

    id: number;
    cliente: Client;
    items: ItemPedido[];
    precioTotal: number;
    fecha: string;
    diaEntrega: string;


}
