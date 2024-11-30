import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fullPhoneRegex = /^[+][0-9]{10,15}$/;
    const basicPhoneRegex = /^[0-9]{9,15}$/;
    const value = control.value;

    if (!value) {
      return null;
    }

    const sanitizedValue = value.replace(/\s+/g, '');

    if (!fullPhoneRegex.test(sanitizedValue)) {
      if (basicPhoneRegex.test(sanitizedValue)) {
        return { missingCountryCode: true };
      }
      return { invalidPhoneNumber: true };
    }

    return null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const value = control.value;

    if (!value) {
      return null;
    }

    const isValid = emailRegex.test(value);

    return isValid ? null : { invalidEmail: true };
  };
}
