import {ItemPedido} from '../item-pedido/item-pedido';

export interface UpdateOrderDTO {

    idPedido:number;
    idCliente:number;
    items:ItemPedido[];
    diaEntrega:string;


}
