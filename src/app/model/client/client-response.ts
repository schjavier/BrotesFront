import {DatosListaCliente} from './datos-lista-cliente';

export interface ClientResponse {
    content:DatosListaCliente[],
    totalElements:number;


}
