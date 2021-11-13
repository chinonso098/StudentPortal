import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenericService } from '../shared/service/generic.service';
import { Student } from './model/student';
import { StudentService } from './service/student.service';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  pageTitle:string = "Student Directory";
  filterList:string = "";
  students:Student[] = [];
  errorMsg: string = '';
  controllerName:string ="Student";
  sub!: Subscription;

  private _studentSerive;
  private _studentService;
  constructor(studentSerice: StudentService, studentService: GenericService) {
      this._studentSerive = studentSerice;
      this._studentService = studentService;
   }

  ngOnInit(): void {
     this.getStudents();
  }

  getStudents():void{
 
    // this.sub = this._studentSerive.getStudents().subscribe({
    //   next: stdnt =>{
    //     this.students = stdnt;
    //   },
    //   error: err => this.errorMsg = err
    // });

    this.sub = this._studentService.getEntities<Student>(this.controllerName).subscribe({
      next: stdnt =>{
        this.students = stdnt;
      },
      error: err => this.errorMsg = err
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
