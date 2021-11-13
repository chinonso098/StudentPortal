import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";
import { Student } from "../model/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private serviceUrl='https://localhost:5001/api/Student';
  //private serviceUrl='http://studentservicesapi-2060235133.us-east-2.elb.amazonaws.com/api/Student';
  private _httpClient;
  
  constructor(httpClient:HttpClient)
  {
    this._httpClient = httpClient;
  }

  // getStudentsStatic(): Student[] {
  //   return [
  //     {
  //        "studentID": 1,
  //        "firstName": "James",
  //        "lastName" : "Bond",
  //        "studentNumber":2572990,
  //        "age":24,
  //        "dob":new Date(1997,9,10),
  //        "admissionDate": new Date(2020,2,10),
  //        "program":"007"
  //     },
  //     {
  //       "studentID": 2,
  //       "firstName": "Shi",
  //       "lastName" : "Reeves",
  //       "studentNumber":2365990,
  //       "age":27,
  //       "dob":new Date(1994,5,10),
  //       "admissionDate": new Date(2019,10,1),
  //       "program":"DS"
  //     },
  //     {
  //       "studentID": 3,
  //       "firstName": "Delta",
  //       "lastName" : "White",
  //       "studentNumber":3655890,
  //       "age":26,
  //       "dob":new Date(1995,4,19),
  //       "admissionDate": new Date(2021,2,1),
  //       "program":"WP"
  //     },
  //   ];
  // }

  // getStudentStatic(studentID: number):Student
  // {
  //   let student: Student = this.getStudentsStatic().find(s => s.studentID == studentID)!;
  //   return student || {};
  // } 

  getStudents(): Observable<Student[]>{
      return this._httpClient.get<Student[]>(this.serviceUrl).pipe(
          tap(data => console.log('', JSON.stringify(data))),
          catchError(this.handleError)
      );
  }

  getStudent(id: number): Observable<Student | undefined>{
      return this.getStudents().pipe(
          map((products: Student[]) => products.find(p => p.studentID === id)),
      );
  }

  createStudent(student: Student): Observable<Student>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._httpClient.post<Student>(this.serviceUrl, student, {headers: headers})
      .pipe(tap( data => console.log('create: ' + JSON.stringify(data))),
            //Return the product with updated id on create
            map(data => data),
            catchError(this.handleError)
      );
  }

  updateStudent(student: Student): Observable<Student> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._httpClient.put<Student>(this.serviceUrl, student, {headers: headers})
      .pipe(tap(() => console.log('updateStudent: ' + student.studentID)),
            //Return the product on an update
            map(() => student),
            catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse){

    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
    } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
