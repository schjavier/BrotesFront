import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ClientDashboardComponent} from './components/dashboard/client-dashboard/client-dashboard.component';
import {ClientListComponent} from './components/dashboard/client-dashboard/client-list/client-list.component';
import {ClientFormsComponent} from './components/forms/client-forms/client-forms.component';

export const routes: Routes = [

  {path: 'login', component : LoginComponent},

  {path: '', component: LoginComponent},

  {path: 'dashboard', component : DashboardComponent, children:[

      {path: 'cliente',
        component : ClientDashboardComponent,
        children: [
          {path: 'listar', component: ClientListComponent},
          {path: 'registrar', component: ClientFormsComponent}
        ]}

    ]},


];
