import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  constructor() {}

  markGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (formGroup.get(key).constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(formGroup.get(key) as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(formGroup.get(key) as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(formGroup.get(key) as FormControl);
          formGroup.get(key).updateValueAndValidity();
          break;
      }
    });
  }

  markArrayDirty(formArray: FormArray) {
    formArray.controls.forEach((control) => {
      switch (control.constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(control as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(control as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(control as FormControl);
          break;
      }
    });
  }

  markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
    formControl.updateValueAndValidity();
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  matchPassword(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  userNameValidator(userControl: AbstractControl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    const UserList = ['ankit', 'admin', 'user', 'superuser'];
    return UserList.indexOf(userName) > -1;
  }

  depValidate(field: string, depField: string): ValidatorFn {
    return (form: FormGroup) => {
      const fieldClt = form.get(field);
      const depFieldClt = form.get(depField);
      fieldClt.setErrors(null);

      if (!depFieldClt.value) {
        return null;
      }

      if (depFieldClt.value && fieldClt.value) {
        return null;
      }

      fieldClt.setValidators(Validators.required);
      fieldClt.setErrors({ required: true });
    };
  }
}
