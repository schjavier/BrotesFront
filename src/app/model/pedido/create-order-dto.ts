import {ItemPedidoDetailsDto} from '../item-pedido/item-pedido-details-dto';

export interface CreateOrderDto {

    idCliente: number;
    items: ItemPedidoDetailsDto[];
    diaEntrega:string;
    isRecurrent?:boolean;

}
