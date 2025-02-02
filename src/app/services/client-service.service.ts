import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client/client';

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
    return this.http.get<Client[]>(this.url + "/all");
  }

}
