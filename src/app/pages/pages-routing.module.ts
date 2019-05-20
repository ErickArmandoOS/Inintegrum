import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { EmployeesComponent } from './employees/employees.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EmpresasComponent } from './empresas/empresas.component';
import { TareasComponent } from './tareas/tareas.component';
import { FechasproxComponent } from './fechasprox/fechasprox.component';
import { AsuntosComponent } from './asuntos/asuntos.component';
import { AsuntoComponent } from './asuntos/asunto/asunto.component';
import { SucesosComponent } from './asuntos/asunto/sucesos/sucesos.component';
import { AppComponent } from '../app.component';





const routes: Routes = [
  {
  path: '',
  component: PagesComponent,
  children: [
     {
       path: 'usuarios',
       component: EmployeesComponent,
     },
     {
       path:'empresa',
       component:EmpresasComponent
     },
     {
       path:'tareas',
       component: TareasComponent
     },
     {
       path: 'fechasproximas',
       component: FechasproxComponent
     },
     {
       path: 'asuntos',
       component: AsuntosComponent
     },
     
     {
       path: 'asunto',
       component: AsuntoComponent
     },
     {
       path: 'sucesos',
       component: SucesosComponent
     }

  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    Ng2SmartTableModule
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
