import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  username = new FormControl('');
  password = new FormControl('');

}
