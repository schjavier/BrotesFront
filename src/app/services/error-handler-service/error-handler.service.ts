import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import * as console from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }


    handleError(error: any): void {

        console.log(error.error);

    }




  handleHttpError(error: HttpErrorResponse):Observable<never> {
    let errorMessage = "Ha ocurrido un error desconocido"
    console.error('Ocurrio un error en la solicitud Http:', error.error);

    switch (error.status) {
      case 0:
        errorMessage = "Error en la solicitud Http:";
        break;
      case 400:
        errorMessage = "Los datos enviados no son correctos";
        if (error.error && error.message) {
          errorMessage = error.message;
        }
        break;
      case 404:
        errorMessage = "Recurso no encontrado!";
        if (error.error && error.message) {
          errorMessage = error.message;
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
