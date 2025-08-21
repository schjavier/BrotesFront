import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {AuthService} from '../../services/auth-service/auth.service';
import {AuthRequest} from '../../model/user/auth-request';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatButton,
        MatLabel,
        MatFormField,
        MatInput,
        ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

    macroTitle:string = "Bienvenido al sistema de gestión de pedidos de"
    title:string = "Brotes"
    subtitle:string = "Organicos"

    authForm: FormGroup = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    })

    constructor(private authService:AuthService,
                private router: Router) {
    }

    login(){

        const authRequest:AuthRequest = {
            username: this.authForm.get('username')?.value,
            password: this.authForm.get('password')?.value
        }

        this.authService.login(authRequest).subscribe({
            next: () => {
                this.router.navigate(['/dashboard']);
            }
        })

    }

}
