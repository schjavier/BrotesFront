import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthResponse} from '../../model/user/auth-response';
import {AuthRequest} from '../../model/user/auth-request';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    http = inject(HttpClient);

  constructor() {}


    url:string = `${environment.apiUrl}/auth`;

    login(authRequest:AuthRequest):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(this.url + "/login", authRequest).pipe(
            tap({
                next: response => {
                    localStorage.setItem('auth_token', response.token)
                }
            })
        )
    }

    logOut():void {
        localStorage.removeItem('auth_token');
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    isLoggedIn():boolean {
        return this.getToken() !== null;
    }

    isTokenExpired(){

       let token = this.getToken();

       if (token !== null){

           let payload = token.split('.')[1];
           let decodedPayload = JSON.parse(atob(payload));
           let exp:number = decodedPayload.exp;
           let expirationTime = new Date(exp*1000);
           let currentTime = new Date();

           return expirationTime <= currentTime

       } else {
           return new Error("no existe el token");
       }


    }


}
