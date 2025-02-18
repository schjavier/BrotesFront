import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {Client} from '../model/client/client';
import {CreateClientDto} from '../model/client/create-client-dto';
import {UpdateClientDto} from '../model/client/update-client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  url:string = 'http://localhost:8080/clientes';

  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(this.url + "/" + id).pipe
    (catchError(this.errorHandler));
  }

  getAllClients():Observable<Client[]>{
    return this.http.get<any>(this.url).pipe(
      map(response => response.content)).pipe
        (catchError(this.errorHandler));
  }

  createClient(clientDto:CreateClientDto):Observable<Client>{
    return this.http.post<Client>(this.url, clientDto)
  }

    getClientByName(searchTerm: string):Observable<Client> {
      return this.http.get<Client>(this.url + "/client?nombre=" + searchTerm).pipe
        (catchError(this.errorHandler));

    }

    deactivateClient(clientId:number):Observable<Client>{
    return this.http.patch<Client>(this.url + "/" + clientId.toString() + "/desactivar", {}).pipe
    (catchError(this.errorHandler));
    }

  activateClient(clientId:number):Observable<Client>{
    return this.http.patch<Client>(this.url + "/" + clientId.toString() + "/activar", {}).pipe
    (catchError(this.errorHandler));
  }


  updateClient(dataClient: UpdateClientDto) {
    return this.http.put<Client>(this.url, dataClient).pipe(catchError(this.errorHandler));
    }


    private errorHandler(error: HttpErrorResponse) {
      console.error('Ocurrio un error:', error);

      if (error.status === 0){
        return throwError( () => new Error('Error de Red: No se pudo conectar al servidor.') );
      } else if (error.status === 404) {
        return throwError( () =>  new Error('Cliente no encontrado!'));
      } else {
        return throwError( () => new Error(error.message) );
      }


    }

}
