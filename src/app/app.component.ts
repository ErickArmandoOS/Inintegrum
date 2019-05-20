/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { routes } from '@nebular/auth';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>'
  //`
  //   <h1 *ngIf="authService.user | async">Welcome {{ (authService.user | async)?.email }}!</h1>

  // <div *ngIf="!(authService.user | async)">
  //   <input type="text" [(ngModel)]="email" placeholder="email">
  //   <input type="password" [(ngModel)]="password" placeholder="email">

  //   <button (click)="signup()" [disabled]="!email || !password">
  //     Signup
  //   </button>

  //   <button (click)="login()" [disabled]="!email || !password">
  //     Login
  //   </button>
  // </div>

  // <button (click)="logout()" *ngIf="authService.user | async">
  //   Logout
  // </button>

  //   `,
  //templateUrl: './app.component.html',
  // styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  ngOnInit() {

  }

  // email: string;
  // password: string;

  // constructor(public authService: AuthService) { }

  // signup() {
  //   this.authService.signup(this.email, this.password);
  //   this.email = this.password = '';
  // }

  // login() {
  //   this.authService.login(this.email, this.password);
  //   this.email = this.password = '';
  // }

  // logout() {
  //   this.authService.logout();
  // }

  
}
