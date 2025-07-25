import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
    imports: [
        MatSidenavModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        RouterLink,
        RouterOutlet,
        RouterLinkActive,
        MatFabButton,
        NavbarComponent,
        MatButton
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  opened: boolean = false;


}
