import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { LandingComponent } from './home/landing.component';
import { StudentModule } from './students/student.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LandingComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'landing', component:LandingComponent},
      {path: '', redirectTo: 'landing', pathMatch: 'full'},
      {path: '**', redirectTo: 'landing', pathMatch: 'full'}
    ]),
    StudentModule,
    BrowserAnimationsModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
