import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralFunctions } from '../shared/general.functions';
import { PassDataService } from '../shared/passdata.service';
import { GenericService } from '../shared/service/generic.service';
import { Student } from './model/student';

@Component({
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  studentForm!: FormGroup;
  private _routeTo;
  private _goBackTo;
  private _studentService;
  private _formBuilder;
  private _passDataService;
  sub!: Subscription;
  student: Student | undefined;
  errorMessage: string = '';
  controllerName: string = "Student";
  isParentDoneLoading:boolean = false;

  constructor(routeTo: ActivatedRoute, gobackTo: Router, studentService: GenericService, formBuilder:FormBuilder, passDataService:PassDataService) 
  {
      this._goBackTo = gobackTo;
      this._routeTo = routeTo;
      this._studentService = studentService;
      this._formBuilder = formBuilder;
      this._passDataService = passDataService;
  }

  ngOnInit(): void {
    const id = Number(this._routeTo.snapshot.paramMap.get('studentID'));
    this.initAndDisableFormFields();

    this.sub = this._studentService.getEntity<Student>(this.controllerName,id).subscribe({
      next: stdnt => this.displayStudent(stdnt),
      error: err => this.errorMessage = err
    })
  }

  initAndDisableFormFields():void{
    // Using the formbuilder approach
    this.studentForm = this._formBuilder.group({
      firstName: '',
      lastName: '',
      studentNumber:'',
      email:'',
      age: '',
      dob: '',
      admissionDate: '',
      program:'',
    })

    this.studentForm.disable();
  }

  displayStudent(studentData: Student|undefined):void{

    if(this.studentForm){
      this.studentForm.reset();
    }

    //The ! is me, telling the compiler that the data will not be null
    this._passDataService.setStudentData(studentData!);

    this.studentForm.setValue({
      firstName: studentData?.firstName,
      lastName: studentData?.lastName,
      studentNumber:studentData?.studentNumber,
      email:studentData?.email,
      age: studentData?.age,
      dob: GeneralFunctions.formatDate(studentData?.doB),
      admissionDate:GeneralFunctions.formatDate(studentData?.admissionDate),
      program: studentData?.program
    })

    this.isParentDoneLoading = true;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onBack():void{
    this._goBackTo.navigate(['/students'])
  }

}
