import {DatosListaProducto} from './datos-lista-producto';

export interface ProductResponse {
    content: DatosListaProducto[],
    totalElements:number;

}
