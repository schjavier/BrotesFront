import { Component } from '@angular/core';
import {CreateClientFormComponent} from './create-client-form/create-client-form.component';

@Component({
  selector: 'app-client-forms',
  imports: [CreateClientFormComponent],
  templateUrl: './client-forms.component.html',
  styleUrl: './client-forms.component.css'
})
export class ClientFormsComponent {

}
