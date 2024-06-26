import { Component, OnInit } from '@angular/core';
import { Icountry } from './shared/model/country';
import { COUNTRIES_META_DATA } from './shared/const/countryDta';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomRegex } from './shared/const/validation';
import { NoSpaceValidator } from './shared/validations/noSpace';
import { AsyncEmailValidator } from './shared/validations/asyncValid';
import { EmpIdValidator } from './shared/validations/empIdVaid';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reactiveForm';
  conInfo: Array<Icountry> = [];
  signUpForm !: FormGroup

  ngOnInit(): void {
    this.conInfo = COUNTRIES_META_DATA;
    this.createSignUpForm()
    this.validCurrAdd()
    this.patchPerAdd()
    this.enableConfirmPassword()
    this.passAndConfPassMatch()
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      userDetails: new FormGroup({
        username: new FormControl(null,
          [
            Validators.required,
            Validators.pattern(CustomRegex.username),
            Validators.minLength(5),
            Validators.maxLength(8),
            NoSpaceValidator.noSpace
          ]
        ),
        email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], [AsyncEmailValidator.isEmailAvailable])
      }),
      empId: new FormControl(null, [Validators.required, EmpIdValidator.EmpIdValid]),
      gender: new FormControl(null),
      skills: new FormArray([new FormControl(null, [Validators.required])]),
      currentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required]),
      }),
      permanentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required]),
      }),
      isAddSame: new FormControl({ value: null, disabled: true }),
      password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern(CustomRegex.password)])
    })
  }

  onSignUpForm() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      console.log(this.signUpForm);
      // this.signUpForm.reset()
    }
  }

  validCurrAdd() {
    this.f['currentAddress'].valueChanges
      .subscribe(res => {
        // console.log(res);
        if (this.f['currentAddress'].valid) {
          this.f['isAddSame'].enable()
        } else {
          this.f['isAddSame'].disable()
          this.f['isAddSame'].patchValue(false)
        }
      })
  }

  patchPerAdd() {
    this.f['isAddSame'].valueChanges
      .subscribe(res => {
        // console.log(res);
        if (res) {
          this.f['permanentAddress'].patchValue(this.f['currentAddress'].value)
          this.f['permanentAddress'].disable()
        } else {
          this.f['permanentAddress'].enable()
          this.f['permanentAddress'].reset()
        }
      })
  }

  enableConfirmPassword() {
    this.f['password'].valueChanges
      .subscribe(res => {
        // console.log(res);
        // console.log(this.f['password'].value)
        if (this.f['password'].valid) {
          this.f['confirmPassword'].enable()
        } else {
          this.f['confirmPassword'].disable()
        }
      })
  }

  passAndConfPassMatch() {
    this.f['confirmPassword'].valueChanges
      .subscribe(res => {
        // console.log(res);
        if (res !== this.f['password'].value) {
          this.f['confirmPassword'].setErrors({ 'passAndConfErr': 'Password and Confirm Password must be same' })
        }
      })
  }

  get f() {
    return this.signUpForm.controls;
  }

  get skillsFormArr() {
    return this.signUpForm.get('skills') as FormArray
  }

  onAddSkill() {
    if (this.skillsFormArr.length < 5) {
      let control = new FormControl(null, [Validators.required])
      this.skillsFormArr.push(control)
    } 
  }

  onRemoveSkill(i: number) {
    this.skillsFormArr.removeAt(i)
  }




}
