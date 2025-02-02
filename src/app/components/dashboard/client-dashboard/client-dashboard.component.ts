import { Component } from '@angular/core';
import {ClientFormsComponent} from "../../forms/client-forms/client-forms.component";
import {ClientListComponent} from './client-list/client-list.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  imports: [
    RouterOutlet
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

  titulo:string = "Client Dashboard";

}
