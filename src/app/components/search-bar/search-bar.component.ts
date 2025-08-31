import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchConfig} from './search-config';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {catchError, debounceTime, distinctUntilChanged, EMPTY, filter, Observable, of, switchMap} from 'rxjs';
import {MatFormField, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from '@angular/material/autocomplete';
import {MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatLabel} from '@angular/material/select';

@Component({
  selector: 'app-search-bar',
    imports: [
        MatIcon,
        ReactiveFormsModule,
        NgIf,
        MatFormField,
        MatAutocompleteTrigger,
        MatIconButton,
        MatInput,
        MatAutocomplete,
        MatOption,
        AsyncPipe,
        NgForOf,
        MatLabel,
        MatSuffix,
        MatPrefix
    ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {

  @Input() searchConfig: SearchConfig = {
    title: "Que vamos a hacer hoy?",
    placeholder: 'Buscar...',
    debounceTime: 300,
    minLength: 1,
  };

  @Input() searchSuggestionFn!: (searchTerm: string) => Observable<any[]>;

  @Input() displayFn!: (item: any) => string;

  @Output() itemSelected = new EventEmitter<any>();

  searchControl: FormControl = new FormControl<string | any>('');

  filteredItems$: Observable<any[]> = EMPTY;

  ngOnInit(): void {
      if (!this.searchSuggestionFn){
          console.error('SearchBar component error, searchSuggestionFn input is requiered for autocomplete functionality');
          return;
      }

      this.filteredItems$ = this.searchControl.valueChanges.pipe(
          filter(value => typeof value === 'string'),
          debounceTime(this.searchConfig.debounceTime!),
          distinctUntilChanged(),
          switchMap(searchTerm => {
              if (searchTerm && searchTerm.length >= this.searchConfig.minLength!){
                  return this.searchSuggestionFn(searchTerm).pipe(
                      catchError(error => {
                          console.error('Error fetching suggestions:', error);
                          return of([])
                      })
                  );
              } else {
                  return of([]);
              }
          })
      );
  }

  onOptionSelected(event: any):void {
      const selectedItem = event.option.value;
      this.itemSelected.emit(selectedItem);
  }

  clearSearch():void{
      this.searchControl.reset('');
      this.filteredItems$ = of([]);
  }
}
