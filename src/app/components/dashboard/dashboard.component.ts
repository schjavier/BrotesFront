import {Component, EventEmitter, Input, input, Output} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ClientFormsComponent} from '../forms/client-forms/client-forms.component';
import {ClientDashboardComponent} from './client-dashboard/client-dashboard.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatButton,
    MatFormFieldModule,
    MatSelectModule,
    ClientDashboardComponent,
    FormsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  opened: boolean = false;


}
