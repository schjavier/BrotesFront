export interface DatosListaProducto {
    id: number;
    nombre: string;
    categoria: string;
    activo: boolean;
    isExpanded?:boolean;
    totalElements?:number;
}
