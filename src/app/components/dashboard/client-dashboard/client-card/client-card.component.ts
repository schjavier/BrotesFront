import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {Client} from '../../../../model/client/client';
import {Observable} from 'rxjs';
import {ClientService} from '../../../../services/client-service.service';
import {AsyncPipe} from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';

@Component({
  selector: 'app-client-card',
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle
  ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {

  client$!: Observable<Client>;

  @Input() id!: number;

  constructor(private clientService: ClientService) {
  }
  ngOnInit():void {
    if (this.id) {
      this.client$ = this.clientService.getClientById(this.id);
    }
  }

}
