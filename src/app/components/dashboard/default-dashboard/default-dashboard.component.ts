import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {SearchBarComponent} from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-default-dashboard',
  imports: [
    SearchBarComponent
  ],
  templateUrl: './default-dashboard.component.html',
  styleUrl: './default-dashboard.component.css'
})
export class DefaultDashboardComponent {

}
