import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const minLength = /.{8,}/;
        const hasUpperCase = /[A-Z]/;
        const hasLowerCase = /[a-z]/;
        const hasNumeric = /[0-9]/;
        const hasSpecial = /[!@#\$%\^&\*]/;

        const valid = minLength.test(value) &&
            hasUpperCase.test(value) &&
            hasLowerCase.test(value) &&
            hasNumeric.test(value) &&
            hasSpecial.test(value);

        return !valid ? { weak: { value: control.value } } : null;
    };
};

export function passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
}