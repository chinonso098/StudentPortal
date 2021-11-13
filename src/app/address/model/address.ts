import { WithProperty } from "src/app/shared/iwithproperty";

export class Address implements WithProperty{

    addressID:number;
    studentID:number;
    streetOne:string;
    streetTwo:string;
    city: string;
    stateID:number;
    zipCode:string;

    constructor(addressId:number, studentId:number, street1:string,street2:string, city:string, stateId:number, zipCode:string)
    {
        this.addressID = addressId;
        this.studentID = studentId;
        this.streetOne = street1;
        this.streetTwo = street2;
        this.city = city;
        this.stateID = stateId;
        this.zipCode = zipCode;
    }

    getAddressID():number{
        return this.addressID;
    }

    ID: number = this.getAddressID();
}