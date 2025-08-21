import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthResponse} from '../../model/user/auth-response';
import {AuthRequest} from '../../model/user/auth-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http:HttpClient,
      private errorHandler:ErrorHandler
  ) { }

    url:string = "http://localhost:8080/auth";

    login(authRequest:AuthRequest):Observable<AuthResponse>{
        return this.http.post<AuthResponse>(this.url + "/login", authRequest).pipe(
            tap({
                next: response => {
                    localStorage.setItem('auth_token', response.token)
                },
                error: error => {
                    this.errorHandler.handleError(error)
                }
            })
        )
    }

    getToken(): string | null {
        return localStorage.getItem('auth_token');
    }

    isLoggedIn():boolean {
        return this.getToken() !== null;
    }


}
