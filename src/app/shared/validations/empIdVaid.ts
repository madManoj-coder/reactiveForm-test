import { AbstractControl, ValidationErrors } from "@angular/forms";




export class EmpIdValidator {
    static EmpIdValid(controls : AbstractControl) : ValidationErrors | null {
        let val : string = controls.value;
        if(!val){
            return null;
        }

        let exp = /^[A-Z]\d{3}$/
        let valid = exp.test(val);

        if(valid){
            return null;
        }else{
            return {
                invalidEmpId : 'Emp Id must be start with one capital alphabet and ends with 3 numbers'
            }
        }
    }
}