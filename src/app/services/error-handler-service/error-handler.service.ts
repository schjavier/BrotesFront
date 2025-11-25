import {ErrorHandler, inject, Injectable} from '@angular/core';
import {NotificationService} from '../notification-service/notification.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

    notifier = inject(NotificationService);

  constructor() { }

    handleError(error: any): void {

        if(error.status === 0) {

            this.notifier.notifyError(`Ups... la solicitud no pudo ser procesada! - Compruebe su conexión`);

        } else {

            this.notifier.notifyError(error.error);

        }


    }


}
