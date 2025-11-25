import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {Client} from '../../model/client/client';
import {CreateClientDto} from '../../model/client/create-client-dto';
import {UpdateClientDto} from '../../model/client/update-client-dto';
import { environment } from '../../../environments/environment';
import {ClientResponse} from '../../model/client/client-response';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient) {
  }

  status:string = "true"
  url:string = `${environment.apiUrl}/clientes`;

  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(this.url + "/" + id);
  }

  getAllClients(pageNumber:number):Observable<ClientResponse>{
    return this.http.get<any>(this.url + "?page=" + pageNumber);
  }

  createClient(clientDto:CreateClientDto):Observable<Client>{
    return this.http.post<Client>(this.url, clientDto);
  }

    getClientByName(searchTerm: string):Observable<Client> {
      return this.http.get<Client>(this.url + "/client?nombre=" + searchTerm);

    }

    deactivateClient(clientId:number):Observable<Client>{
    return this.http.patch<Client>(this.url + "/" + clientId.toString() + "/desactivar", {});
    }

  activateClient(clientId:number):Observable<Client>{
    return this.http.patch<Client>(this.url + "/" + clientId.toString() + "/activar", {});
  }

  updateClient(dataClient: UpdateClientDto) {
    return this.http.put<Client>(this.url, dataClient);
    }

    deleteClient(clientId:number):Observable<Client>{
      return this.http.delete<Client>(this.url + "/" + clientId);
    }

    getClientSuggestionByName(nombre: string):Observable<Client[]> {
      return this.http.get<Client[]>(this.url + "/buscar?nombre=" + nombre);
    }
    getClientSuggestionByNameAndStatus(nombre: string):Observable<Client[]> {
      return this.http.get<Client[]>(this.url + "/buscar?nombre=" + nombre + "&status=" + this.status);
    }


}
