import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancosComponent } from './bancos/bancos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'bancos', component: BancosComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'inicio', component: HomeComponent},
  {path: '', redirectTo: '/inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
