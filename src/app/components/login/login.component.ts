import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
    imports: [
        ReactiveFormsModule,
        MatButton,
        MatLabel,
        MatFormField,
        MatInput,
        NgOptimizedImage,
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



}
