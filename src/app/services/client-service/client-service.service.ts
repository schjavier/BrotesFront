import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {Client} from '../../model/client/client';
import {CreateClientDto} from '../../model/client/create-client-dto';
import {UpdateClientDto} from '../../model/client/update-client-dto';
import {ErrorHandlerService} from '../error-handler-service/error-handler.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private errorHandler:ErrorHandlerService) {
  }

  status:string = "true"
  url:string = `${environment.apiUrl}/clientes`;

  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(this.url + "/" + id).pipe
    (catchError(error => this.errorHandler.handleHttpError(error)));
  }

  getAllClients():Observable<Client[]>{
    return this.http.get<any>(this.url).pipe(
      map(response => response.content)).pipe
        (catchError(error=> this.errorHandler.handleHttpError(error) ));
  }

  createClient(clientDto:CreateClientDto):Observable<Client>{
    return this.http.post<Client>(this.url, clientDto)
  }

    getClientByName(searchTerm: string):Observable<Client> {
      return this.http.get<Client>(this.url + "/client?nombre=" + searchTerm).pipe
        (catchError(error => this.errorHandler.handleHttpError(error)));

    }

    deactivateClient(clientId:number):Observable<Client>{
    return this.http.patch<Client>(this.url + "/" + clientId.toString() + "/desactivar", {}).pipe
    (catchError(error => this.errorHandler.handleHttpError(error)));
    }

  activateClient(clientId:number):Observable<Client>{
    return this.http.patch<Client>(this.url + "/" + clientId.toString() + "/activar", {}).pipe
    (catchError(error => this.errorHandler.handleHttpError(error)));
  }

  updateClient(dataClient: UpdateClientDto) {
    return this.http.put<Client>(this.url, dataClient).pipe(
      catchError(error => this.errorHandler.handleHttpError(error)));
    }

    deleteClient(clientId:number):Observable<Client>{
      return this.http.delete<Client>(this.url + "/" + clientId).pipe(
        catchError(error => this.errorHandler.handleHttpError(error)));
    }

    getClientSuggestionByName(nombre: string):Observable<Client[]> {
      return this.http.get<Client[]>(this.url + "/buscar?nombre=" + nombre).pipe(
          catchError(error => this.errorHandler.handleHttpError(error))
      )
    }
    getClientSuggestionByNameAndStatus(nombre: string):Observable<Client[]> {
      return this.http.get<Client[]>(this.url + "/buscar?nombre=" + nombre + "&status=" + this.status).pipe(
          catchError(error => this.errorHandler.handleHttpError(error))
      )
    }


}
