import {Component, inject, OnInit, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {SearchBarComponent} from '../../search-bar/search-bar.component';
import {SuggestionService} from '../../../services/suggestion-service/suggestion.service';
import {Suggestion} from '../../../model/suggestions/suggestion';
import {Router} from '@angular/router';
import {ActivityCardComponent} from './activity-card/activity-card.component';

@Component({
  selector: 'app-default-dashboard',
  imports: [
    SearchBarComponent,
    ActivityCardComponent
  ],
  templateUrl: './default-dashboard.component.html',
  styleUrl: './default-dashboard.component.css'
})
export class DefaultDashboardComponent implements OnInit {

  suggestionsService = inject(SuggestionService);
  router= inject(Router);

  activities = signal<Suggestion[]>([]);

  ngOnInit(): void {
    this.activities.set(this.suggestionsService.suggestions().slice(0,3));
  }



  getActivitySuggestion = (searchTerm:string) => {
    return this.suggestionsService.searchSuggestion(searchTerm);
  }

  displayActivitySuggestion = (suggestion: Suggestion):string => {
    return suggestion ? `${suggestion.name}` : '';
  }

  onSuggestionSelected(activity: Suggestion): void {
    if (activity && activity.path) {
      this.router.navigate([activity.path]);
    }
  }
}
