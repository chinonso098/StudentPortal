import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICanDeactivate } from '../shared/icandeactivate';
import { PassDataService } from '../shared/passdata.service';
import { GenericService } from '../shared/service/generic.service';
import { Student } from '../students/model/student';
import { Address } from './model/address';

@Component({
  selector: 'sp-address-view',
  templateUrl: './address-view.component.html',
  styleUrls: ['./address-view.component.css']
})
export class AddressViewComponent implements OnInit, OnDestroy{

  addressForm!: FormGroup;
  student!: Student;
  address: Address | undefined;

  private _adrFormBuilder;
  private _passDataService: PassDataService;
  private _addressService;
  addressErrorMessages:string = '';
  sub!: Subscription;
  showAddressForm:boolean = false;
  showFormbuttons2:boolean = true;
  controllerName:string = "Address";

  constructor(adrFormBuilder:FormBuilder, passDataService: PassDataService, addressSerivce: GenericService ) 
  {
    this._adrFormBuilder = adrFormBuilder;
    this._passDataService = passDataService;
    this._addressService = addressSerivce;
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void{
    
    this.student = this._passDataService.getStudentData();
    this.initForm();
    let url = `${this.controllerName}/GetAddressByStudentId`;

    this.sub = this._addressService.getEntity<Address>(url, this.student.studentID).subscribe({
      next: addr => this.displayAddress(addr),
      error: err => this.addressErrorMessages = err
    })
  }

  initForm():void{
    this.addressForm = this._adrFormBuilder.group({
      streetOne:['',Validators.required],
      streetTwo:'',
      city:['',Validators.required],
      stateID:['',Validators.required],
      zipCode:['',Validators.required]
    });

    this.addressForm.disable();
  }

  displayAddress(addr: Address | undefined): void {

    // set the value of the address property.
    this.address = addr;
    
    if(this.addressForm){
      this.addressForm.reset();
    }

    this.addressForm.setValue({
      streetOne:addr?.streetOne,
      streetTwo: addr?.streetTwo,
      city:addr?.city,
      stateID:addr?.stateID,
      zipCode:addr?.zipCode
    })
  }
}
