import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  popUp = inject(MatSnackBar);
  defaultDuration: number = 5000;

  constructor() { }

  notifyError(notification:string, duration?:number){

      this.popUp.open(
        notification,
        "OK",
        { duration: duration? duration : this.defaultDuration, panelClass: 'errorSnackBar'});
  }

  notifyInfo(notification:string, duration?:number){
      this.popUp.open(
        notification,
        "OK",
        { duration: duration? duration : this.defaultDuration, panelClass: 'infoSnackBar'});
  }



}
