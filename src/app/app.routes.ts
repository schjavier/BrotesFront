import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ClientDashboardComponent} from './components/dashboard/client-dashboard/client-dashboard.component';
import {ClientListComponent} from './components/dashboard/client-dashboard/client-list/client-list.component';
import {CreateClientFormComponent} from './components/forms/client-forms/create-client-form/create-client-form.component';
import {
  UpdateClientFormComponent
} from './components/forms/client-forms/update-client-form/update-client-form.component';
import {DefaultDashboardComponent} from './components/dashboard/default-dashboard/default-dashboard.component';
import {ProductDashboardComponent} from './components/dashboard/product-dashboard/product-dashboard.component';
import {ProductListComponent} from './components/dashboard/product-dashboard/product-list/product-list.component';
import {
  CreateProductFormComponent
} from './components/forms/product-forms/create-product-form/create-product-form.component';
import {
  UpdateProductFormComponent
} from './components/forms/product-forms/update-product-form/update-product-form.component';
import {OrderDashboardComponent} from './components/dashboard/order-dashboard/order-dashboard.component';
import {OrderListComponent} from './components/dashboard/order-dashboard/order-list/order-list.component';
import {CreateOrderFormComponent} from './components/forms/order/create-order-form/create-order-form.component';

export const routes: Routes = [

  {path: 'login', component : LoginComponent},

  {path: '', component: LoginComponent},

  {path: 'dashboard', component : DashboardComponent, children:[

          {path:'', component : DefaultDashboardComponent},

          {path: 'cliente',
            component : ClientDashboardComponent,
            children: [
              {path: 'listar', component: ClientListComponent},
              {path: 'registrar', component: CreateClientFormComponent},
              {path: 'actualizar', component: UpdateClientFormComponent}
            ]},

          {path: 'producto',
            component : ProductDashboardComponent,
            children: [
              {path: 'listar', component: ProductListComponent},
              {path: 'registrar', component: CreateProductFormComponent},
              {path: 'actualizar', component: UpdateProductFormComponent}
            ]},

          {path: 'pedidos',
          component : OrderDashboardComponent,
          children: [
              {path: 'listar', component: OrderListComponent},
              {path: 'registrar', component: CreateOrderFormComponent},
              {path: 'actualizar/:id', component: CreateOrderFormComponent}
          ]}

    ]},


];
