import {Component, input} from '@angular/core';
import {
  MatCard, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import {Suggestion} from '../../../../model/suggestions/suggestion';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-activity-card',
  imports: [
    MatCard,
    MatCardTitle,
    FormsModule,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink,
  ],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css'
})
export class ActivityCardComponent {

  activity = input.required<Suggestion>();

}
