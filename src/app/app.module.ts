/**
 * @license
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

 //CORE
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//ENVIROMENT
import { environment } from '../environments/environment';

//COMPONENTES
import { AppComponent } from './app.component';

//SERVICIOS
import { EmployeeService } from './shared/employee.service';
import { EmpresaService } from './shared/empresa.service';

//MODULOS
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NbDialogModule, NbDatepickerModule } from '@nebular/theme';
import { CoreModule } from './@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


//FIREBASE

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AuthService } from './core/auth.service';

import { loginComponent } from './login/login.component';




@NgModule({
  declarations: [AppComponent,
    loginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),

    
    FormsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    
    AngularFirestoreModule,
    AngularFirestoreModule
    
    

  ],
  bootstrap: [AppComponent],
  providers: [
    AuthService,
    AngularFireAuth,
    //{ provide: APP_BASE_HREF, useValue: '/' },
    EmployeeService,
    EmpresaService
  ]
})
export class AppModule {
}
