import { AbstractControl, ValidationErrors } from "@angular/forms";




export class NoSpaceValidator {
    static noSpace(controls: AbstractControl): ValidationErrors | null {
        if (!controls.value) {
            return null;
        }

        if (controls.value.includes(' ')) {
            return {
                noSpaceErr: 'Space is not allowed'
            }
        } else {
            return null;
        }
    }
}