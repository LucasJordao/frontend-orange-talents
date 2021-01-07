import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BancosComponent } from './bancos/bancos.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  {path: 'bancos', component: BancosComponent},
  {path: 'clientes', component: ClientesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
