import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidator } from '../shared/custom.validators';
import { GeneralFunctions } from '../shared/general.functions';
import { ICanDeactivate } from '../shared/icandeactivate';
import { PassDataService } from '../shared/passdata.service';
import { GenericService } from '../shared/service/generic.service';
import { Student } from './model/student';

@Component({
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit, OnDestroy, ICanDeactivate {
  studentForm!: FormGroup;
  private _routeTo;
  private _goBackTo;
  private _studentService;
  private _formBuilder;
  private _passDataService;
  sub!: Subscription;
  student: Student | undefined;
  errorMessage: string = '';
  isFormSubmitted:boolean = false;
  isParentDoneLoading:boolean = false;
  controllerName:string = "Student";

  constructor(routeTo: ActivatedRoute, gobackTo: Router, studentService: GenericService, formBuilder:FormBuilder, passDataService: PassDataService) 
  {
      this._goBackTo = gobackTo;
      this._routeTo = routeTo;
      this._studentService = studentService;
      this._formBuilder = formBuilder;
      this._passDataService = passDataService;
  }

  ngOnInit(): void {
    const id = Number(this._routeTo.snapshot.paramMap.get('studentID'));
    this.createFormInstance();

    this.sub = this._studentService.getEntity<Student>(this.controllerName,id).subscribe({
      next: stdnt => this.displayStudent(stdnt),
      error: err => this.errorMessage = err
    })
  }

  isFormDirty(): boolean {
    // form is not dirty and not submitted
    if(this.isFormSubmitted == false && this.studentForm?.dirty == false)
        return false;
    // form is dirty and submitted
    else if(this.isFormSubmitted == true && this.studentForm?.dirty == true)
        return false;   

    // form is dirty and not submitted
    return true;
  }

  formName():string{
    return "Edit Student";
  }  

  createFormInstance():void{
      // Using the formbuilder approach
    this.studentForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      studentNumber:{value:'', disabled:true},
      email:["",[Validators.required, Validators.email]],
      age:['',[Validators.required,CustomValidator.ageRange(13,100)]],
      dob:['', [Validators.required, CustomValidator.dateofBirthRange()]],
      admissionDate:['', [Validators.required, CustomValidator.admissionDateRange()]],
      program:['', [Validators.required, Validators.minLength(3), Validators.maxLength(35)]]
    })
  }

  displayStudent(studentData: Student|undefined):void{
    // set the value of student, to student data
    this.student = studentData;

    this._passDataService.setStudentData(this.student!);

    if(this.studentForm){
      this.studentForm.reset();
    }

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

  onUpdate():void{
  
    if(this.studentForm.valid){
      if(this.studentForm.dirty){

        this.isFormSubmitted = true;

        const s = {...this.student, ...this.studentForm.value};

        this.sub = this._studentService.updateEntity<Student>(this.controllerName,s)
        .subscribe({
            next: x => this.onUpdateComplete(x),
            error: err => this.errorMessage = err
        });
      }
    }else{
      this.errorMessage = 'Please correct the validation errors'
    }
  }

  onUpdateComplete(x: Student): void {
    alert("Update Successful!");
    this.resetFormState();
  }

  resetFormState():void{
    this.studentForm.markAsPristine();
    this.studentForm.markAsUntouched();
    this.studentForm.updateValueAndValidity();
  }

  onBack():void{
    this._goBackTo.navigate(['/students'])
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
