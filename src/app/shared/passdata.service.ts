import { Injectable } from '@angular/core';
import { Student } from '../students/model/student';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {

  constructor() { }

  private data:Student | undefined;

  public setStudentData(data:Student){
    this.data = data;
  }

  public getStudentData(){
    return this.data!;
  }

  public clearData():void{
    this.data = undefined;
  }
}
