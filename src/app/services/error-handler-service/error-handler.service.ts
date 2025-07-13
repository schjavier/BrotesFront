import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleHttpError(error: HttpErrorResponse):Observable<never> {
    let errorMessage = "Ha ocurrido un error desconocido"
    console.error('Ocurrio un error en la solicitud Http:', error);

    switch (error.status) {
      case 0:
        errorMessage = "Error en la solicitud Http:";
        break;
      case 400:
        errorMessage = "Los datos enviados no son correctos";
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        break;
      case 404:
        errorMessage = "Recurso no encontrado!";
        if (error.url){
          errorMessage += `(URL: ${error.url})`;
        }
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        break;
      case 500:
        errorMessage = "Error en el servidor!";
        if(error.error && error.error.message){
          errorMessage = error.error.message;
        }
        break;
    }

    return throwError( ()=> new Error(errorMessage));
  }

}
