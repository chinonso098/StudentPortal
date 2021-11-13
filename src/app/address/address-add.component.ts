import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICanDeactivate } from '../shared/icandeactivate';
import { PassDataService } from '../shared/passdata.service';
import { GenericService } from '../shared/service/generic.service';
import { Address } from './model/address';
import { AddressService } from './service/address.service';

@Component({
  selector: 'sp-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css']
})
export class AddressAddComponent implements OnInit, OnDestroy,ICanDeactivate {
  addressForm!: FormGroup;
  address: Address | undefined;

  private _adrFormBuilder;
  private _passDataService;
  private _addressService;
  addressErrorMessages:string = '';
  isAddressFormSubmitted:boolean = false;
  sub!: Subscription;
  showFormbuttons2:boolean = true;
  controllerName:string = "Address";

  constructor(adrFormBuilder:FormBuilder, passDataService: PassDataService, addressService:GenericService) 
  {
    this._adrFormBuilder = adrFormBuilder;
    this._passDataService = passDataService;
    this._addressService = addressService;
  }
  isFormDirty(): boolean {
    // form is not dirty and not submitted
    if(this.isAddressFormSubmitted==true && this.addressForm?.dirty == false)
      return false;
  
    // form is dirty and not submitted
    return true;
  }
  formName(): string {
    return "Add Address";
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.addressForm = this._adrFormBuilder.group({
        streetOne:['',Validators.required],
        streetTwo:'',
        city:['',Validators.required],
        stateID:['',Validators.required],
        zipCode:['',Validators.required]
    });
  }

  onCreateAddress(addressForm:FormGroup): void{
    if(this.addressForm.valid){
      if(this.addressForm.dirty){
        let studentData = this._passDataService.getStudentData();
        this.isAddressFormSubmitted = true;

        let addr = {...this.address, ...this.addressForm.value}
        addr.studentID = studentData.studentID;

        this.sub = this._addressService.createEntity<Address>(this.controllerName,addr)
        .subscribe({
            next: x => this.onCreateComplete(),
            error: err => this.addressErrorMessages = err
        });
      }
    }else{
      this.addressErrorMessages = 'Please correct the validation errors'
    }
  }

  onCreateComplete(): void{
    alert("Student's address successfully created!");
  }
}
