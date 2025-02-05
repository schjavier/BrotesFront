import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Client} from '../model/client/client';
import {CreateClientDto} from '../model/client/create-client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) {
  }

  url:string = 'http://localhost:8080/clientes';

  getClientById(id:number):Observable<Client>{
    return this.http.get<Client>(this.url + "/" + id);
  }

  getAllClients():Observable<Client[]>{
    return this.http.get<any>(this.url).pipe(
      map(response => response.content)
    );
  }

  createClient(clientDto:CreateClientDto):Observable<Client>{
    return this.http.post<Client>(this.url, clientDto)
  }

}
