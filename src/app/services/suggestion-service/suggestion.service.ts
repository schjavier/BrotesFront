import {computed, Injectable, signal} from '@angular/core';
import {Suggestion} from '../../model/suggestions/suggestion';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

    filteredSuggestions= signal<Suggestion[]>([]);

    suggestions= signal<Suggestion[]>( [

      {name: 'Crear Pedido', path: '/dashboard/pedidos/registrar', description: 'Crea un pedido'},
      {name: 'Listar Pedidos', path: '/dashboard/pedidos/listar', description: 'Lista todos los pedidos'},
      {name: 'Generar Planilla', path: '/dashboard/pedidos/generar', description: 'Genera la planilla de producción'},

      {name: 'Registrar Productos', path: '/dashboard/producto/registrar', description: 'Permite cargar un producto en el sistema'},
      {name: 'Actualizar Productos', path: '/dashboard/producto/actualizar', description: 'Permite Modificar un producto existente'},
      {name: 'Listar Productos', path: '/dashboard/producto/listar', description: 'Muesta la Lista de todos los productos'},

      {name: 'Registrar Cliente', path: '/dashboard/cliente/registrar', description: 'Permite cargar un cliente en el sistema'},
      {name: 'Actualizar Clientes', path: '/dashboard/cliente/actualizar', description: 'Permite Modificar un Cliente existente'},
      {name: 'Listar clientes', path: '/dashboard/cliente/listar', description: 'Muesta la Lista de todos los clientes'},

    ])

  constructor() { }

  searchSuggestion(searchTerm:string):Observable<Suggestion[]> {

      if(!searchTerm || searchTerm.length < 1 ){
        return of([]);
      }


      const lowercaseSearchTerm = searchTerm.toLowerCase();
      console.log(this.suggestions())
      this.filteredSuggestions.update( ()=>
        this.suggestions().filter(
          suggestion => suggestion.name.toLowerCase().includes(lowercaseSearchTerm)
        )
      )
      console.log(this.filteredSuggestions());

      return of(this.filteredSuggestions());
  }



}
