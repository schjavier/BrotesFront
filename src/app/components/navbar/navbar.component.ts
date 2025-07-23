import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
    imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  titulo: string = 'Brotes';
  subtitulo: string = 'Orgánicos';


}
