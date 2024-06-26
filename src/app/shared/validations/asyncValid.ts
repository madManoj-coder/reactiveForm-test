import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";




export class AsyncEmailValidator {
    static isEmailAvailable(controls: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        let val: string = controls.value;
        const pro = new Promise<ValidationErrors | null>((resolve, reject) => {
            setTimeout(() => {
                if (val === 'manojwaghmare@gmail.com') {
                    resolve({
                        emailExistErr: 'This Email id is already in use'
                    })
                } else {
                    resolve(null)
                }
            }, 2000);
        })
        return pro
    }
}