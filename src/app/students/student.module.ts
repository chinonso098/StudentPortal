
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentDetailComponent } from '../students/student-detail.component';
import { StudentListComponent } from '../students/student-list.component';
import { StudentEditComponent } from '../students/student-edit.component';
import { StudentAddComponent } from './student-add.component';
import { UnsavedchangeGuard } from '../shared/unsavedchange.guard';
import { ValidParamGuard } from '../shared/validparam.guard';
import { AddressAddComponent } from '../address/address-add.component';
import { AddressEditComponent } from '../address/address-edit.component';
import { AddressViewComponent } from '../address/address-view.component';


@NgModule({
  declarations: [    
    StudentDetailComponent,
    StudentListComponent,
    StudentEditComponent,
    StudentAddComponent,
    AddressAddComponent,
    AddressEditComponent,
    AddressViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'students', component: StudentListComponent},
      {path: 'students/add', 
       canDeactivate:[UnsavedchangeGuard],
       component: StudentAddComponent
      },
      {path: 'students/:studentID/view', canActivate:[ValidParamGuard], component: StudentDetailComponent},
      {path: 'students/:studentID/edit',
       canDeactivate:[UnsavedchangeGuard],
       canActivate:[ValidParamGuard], component: StudentEditComponent},
    ]),
  ],
  exports: [ReactiveFormsModule]
})
export class StudentModule { }
