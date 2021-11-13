import { Component, OnDestroy, OnInit } from "@angular/core";
import {FormBuilder,FormGroup,Validators,} from "@angular/forms";
import { Router } from "@angular/router";
import { Student } from "./model/student";
import { CustomValidator } from "../shared/custom.validators";
import { ICanDeactivate } from "../shared/icandeactivate";
import { Subscription } from "rxjs";
import { PassDataService } from "../shared/passdata.service";
import { GenericService } from "../shared/service/generic.service";

@Component({
  templateUrl: "./student-add.component.html",
  styleUrls: ["./student-add.component.css"],
})
export class StudentAddComponent implements OnInit, OnDestroy, ICanDeactivate {
  studentForm!: FormGroup;
  private _formBuilder;
  private _studentService;
  private _goBackTo;
  private _passDataService;
  student: Student | undefined;
  dobMessage: string = "";
  admissionDateMessage: string = "";
  isFormSubmitted: boolean = false;
  errorMessage: string = "";
  sub!: Subscription;
  showAddressForm: boolean = false;
  showFormbuttons: boolean = true;
  controllerName: string = "Student";

  constructor(
    formBuilder: FormBuilder,
    studentService: GenericService,
    goBackTo: Router,
    passDataService: PassDataService
  ) {
    this._formBuilder = formBuilder;
    this._goBackTo = goBackTo;
    this._studentService = studentService;
    this._passDataService = passDataService;
  }

  isFormDirty(): boolean {
    // form is not dirty and not submitted
    if (this.isFormSubmitted == true && this.studentForm.dirty == false)
      return false;
    else if (this.isFormSubmitted == false && this.studentForm.dirty == false)
      return false;

    // form is dirty and not submitted
    return true;
  }

  formName(): string {
    return "Add Student";
  }

  ngOnInit(): void {
    this.studentForm = this._formBuilder.group({
      firstName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(25),]],
      lastName: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(25),]],
      studentNumber: "",
      email:["",[Validators.required, Validators.email]],
      age: ["", [Validators.required, CustomValidator.ageRange(13, 100)]],
      dob: ["", [Validators.required, CustomValidator.dateofBirthRange()]],
      admissionDate: ["",[Validators.required, CustomValidator.admissionDateRange()]],
      program: ["",[Validators.required,Validators.minLength(3),Validators.maxLength(35),]],
    });
  }

  onCreate(studentForm: FormGroup): void {
    if (this.studentForm.valid) {
      if (this.studentForm.dirty) {
        this.isFormSubmitted = true;
        const s = { ...this.student, ...this.studentForm.value };

        this.sub = this._studentService
          .createEntity<Student>(this.controllerName, s)
          .subscribe({
            next: (x) => this.onCreateComplete(x),
            error: (err) => (this.errorMessage = err),
          });
      }
    } else {
      this.errorMessage = "Please correct the validation errors";
    }
  }

  // this method has the updated student model with the StudentID
  onCreateComplete(student: Student): void {
    this.showFormbuttons = false;
    this.lockAndResetFormState();

    // display nested address section
    this.showAddressForm = true;
    // retrieved student data will be passed to other components
    this._passDataService.setStudentData(student);

    alert("Student successfully created!");
  }

  lockAndResetFormState(): void {
    this.studentForm.disable();
    this.studentForm.markAsPristine();
    this.studentForm.markAsUntouched();
    this.studentForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onBack(): void {
    this._goBackTo.navigate(["/students"]);
  }
}
