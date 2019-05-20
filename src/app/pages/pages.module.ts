import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { EmployeeComponent } from './employees/employee/employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresaComponent } from './empresas/empresa/empresa.component';
import { EmpresaListComponent } from './empresas/empresa-list/empresa-list.component';
import { TareasComponent } from './tareas/tareas.component';
import { TareaComponent } from './tareas/tarea/tarea.component';
import { TareaListComponent } from './tareas/tarea-list/tarea-list.component';
import { FechasproxComponent } from './fechasprox/fechasprox.component';
import { FechaproxComponent } from './fechasprox/fechaprox/fechaprox.component';
import { FechaproxListComponent } from './fechasprox/fechaprox-list/fechaprox-list.component';
import { SmartTableService } from '../@core/mock/smart-table.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AsuntosComponent } from './asuntos/asuntos.component';
import { AsuntoComponent } from './asuntos/asunto/asunto.component';
import { AsuntoListComponent } from './asuntos/asunto-list/asunto-list.component';
import { PropuestasComponent } from './asuntos/asunto/propuestas/propuestas.component';
import { PropuestasListComponent } from './asuntos/asunto/propuestas/propuestas-list/propuestas-list.component';
import { SucesosComponent } from './asuntos/asunto/sucesos/sucesos.component';
import { SucesosListComponent } from './asuntos/asunto/sucesos/sucesos-list/sucesos-list.component';
import { FechproxComponent } from './asuntos/asunto/fechprox/fechprox.component';
import { AsuntoSelectComponent } from './asuntos/asunto/asunto-select/asunto-select.component';

import { BorrarbuttonComponent } from './tareas/buttons/borrarbutton/borrarbutton.component';
import { TeditarbuttonComponent } from './tareas/buttons/teditarbutton/teditarbutton.component';
import { SelectbuttonComponent } from './asuntos/selectbutton/selectbutton.component';
import { AborrarbuttonComponent } from './asuntos/aborrarbutton/aborrarbutton.component';
import { AeditbuttonComponent } from './asuntos/aeditbutton/aeditbutton.component';
import { FeditbuttonComponent } from './fechasprox/buttons/feditbutton/feditbutton.component';
import { FborrarbuttonComponent } from './fechasprox/buttons/fborrarbutton/fborrarbutton.component';
import { EborrarbuttonComponent } from './empresas/buttons/eborrarbutton/eborrarbutton.component';
import { EeditarbuttonComponent } from './empresas/buttons/eeditarbutton/eeditarbutton.component';
import { EshotbuttonComponent } from './empresas/buttons/eshotbutton/eshotbutton.component';
import { UborrarbuttonComponent } from './employees/buttons/uborrarbutton/uborrarbutton.component';
import { UeditarbuttonComponent } from './employees/buttons/ueditarbutton/ueditarbutton.component';
import { PeditarbuttonComponent } from './asuntos/asunto/propuestas/buttons/peditarbutton/peditarbutton.component';
import { PborrarbuttonComponent } from './asuntos/asunto/propuestas/buttons/pborrarbutton/pborrarbutton.component';
import { SeditarbuttonComponent } from './asuntos/asunto/sucesos/buttons/seditarbutton/seditarbutton.component';
import { SborrarbuttonComponent } from './asuntos/asunto/sucesos/buttons/sborrarbutton/sborrarbutton.component';
import { EmplistComponent } from './asuntos/asunto/sucesos/buttons/emplist/emplist.component';





const PAGES_COMPONENTS = [
  PagesComponent,
  
  EmployeesComponent,
  EmployeeComponent,
  EmployeeListComponent,

  EmpresaComponent,
  EmpresasComponent,
  EmpresaListComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    TareasComponent,
    TareaComponent,
    TareaListComponent,
    FechasproxComponent,
    FechaproxComponent,
    FechaproxListComponent,
    AsuntosComponent,
    AsuntoComponent,
    AsuntoListComponent,
    PropuestasComponent,
    PropuestasListComponent,
    SucesosComponent,
    SucesosListComponent,
    FechproxComponent,
    AsuntoSelectComponent,
 
    BorrarbuttonComponent,
    TeditarbuttonComponent,
    SelectbuttonComponent,
    AborrarbuttonComponent,
    AeditbuttonComponent,
    FeditbuttonComponent,
    FborrarbuttonComponent,
    EborrarbuttonComponent,
    EeditarbuttonComponent,
    EshotbuttonComponent,
    UborrarbuttonComponent,
    UeditarbuttonComponent,
    PeditarbuttonComponent,
    PborrarbuttonComponent,
    SeditarbuttonComponent,
    SborrarbuttonComponent,
    EmplistComponent
  ],
  entryComponents: [

    EmplistComponent,

    BorrarbuttonComponent,
    TeditarbuttonComponent,
    SelectbuttonComponent,
    AborrarbuttonComponent,
    AeditbuttonComponent,
    FborrarbuttonComponent,
    FeditbuttonComponent,
    EeditarbuttonComponent,
    EborrarbuttonComponent,
    EshotbuttonComponent,

    UborrarbuttonComponent,
    UeditarbuttonComponent,

    PborrarbuttonComponent,
    PeditarbuttonComponent,

    SborrarbuttonComponent,
    SeditarbuttonComponent
  
  ]
})
export class PagesModule {
}
