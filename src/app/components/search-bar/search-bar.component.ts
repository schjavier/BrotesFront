import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchConfig} from './search-config';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-search-bar',
  imports: [
    MatIcon,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {

  @Input() searchConfig: SearchConfig = {
    title: "Que Vamos a hacer hoy?",
    placeholder: 'Search...',
    debounceTime: 300,
    minLength: 3,
  };

  @Output() searchChange = new EventEmitter();

  searchControl:FormControl = new FormControl('');

  ngOnInit(): void {
  }
// todo logica de la barra de busqueda!


}
