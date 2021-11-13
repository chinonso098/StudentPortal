// export interface IStudent {
//     studentID: number;
//     firstName: string;
//     lastName: string;
//     age: number;
//     studentNumber: number;
//     dob: Date;
//     admissionDate: Date;
//     program: string;
// }

import { WithProperty } from "src/app/shared/iwithproperty";

export class Student implements WithProperty {
  studentID: number;
  firstName: string;
  lastName: string;
  age: number;
  studentNumber: number;
  email: string;
  doB: Date;
  admissionDate: Date;
  program: string;

  constructor(sId: number,fname: string,lname: string,age: number,snum: number,semail: string,dob: Date,admdob: Date,prgm: string
  ) {
    this.studentID = sId;
    this.firstName = fname;
    this.lastName = lname;
    this.age = age;
    this.studentNumber = snum;
    this.email = semail;
    this.doB = dob;
    this.admissionDate = admdob;
    this.program = prgm;
  }

  getStudentID(): number {
    return this.studentID ?? 0;
  }

  ID: number = this.getStudentID();
}
