import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustomValidator{

    static dateofBirthRange(): ValidatorFn {
        return(c: AbstractControl): {[key: string]: boolean } | null =>{
            let minDate = new Date(1921,1,1);
            // set a maxDate of at least 10 years
            let maxYear = new Date().getFullYear() - 10;
            let maxDate = new Date(maxYear,12,30);
    
            if(new Date(c.value) < minDate || new Date(c.value) > maxDate){
                return {'range': true}
            }
            
            return null;
        }
    }


    static admissionDateRange(): ValidatorFn {
        return(c: AbstractControl): {[key: string]: boolean } | null =>{
            let minDate = new Date(1921,1,1);
            let maxDate = new Date();
            if(new Date(c.value)< minDate || new Date(c.value) > maxDate){
                return {'range': true}
            }
            
            return null;
        }
    }


    static ageRange(min:number, max:number): ValidatorFn {
        return(c: AbstractControl): {[key: string]: boolean } | null =>{
            if( c.value < min || c.value > max){
                return {'range': true}
            }

            return null;
        }
    }
    
}