import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import interceptor from 'apis/Interceptor';
import { requestApiHelper } from 'helpers';
import { SharedStateService } from 'services/shared.service';

@Component(
    {
        selector: 'register-page',
        standalone: true,
        templateUrl: 'register.page.component.html',
        imports: [
            NgIf,
            ReactiveFormsModule,
            RouterLink
        ]
    }
)
export class RegisterPage {
    form: FormGroup<{
        displayName: FormControl<string | null>,
        email: FormControl<string | null>,
        password: FormControl<string | null>,
        confirmPassword: FormControl<string | null>,
    }> = new FormGroup(
        {
            displayName: new FormControl("", [Validators.required]),
            email: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [Validators.required]),
            confirmPassword: new FormControl(
                "",
                [
                    Validators.required,
                ]
            )
        }, {
        validators: this.matchPasswordValidator as ValidatorFn
    }
    )

    constructor(private router: Router, private sharedStateService: SharedStateService) {
    }


    matchPasswordValidator(control: FormControl): ValidationErrors | null {
        return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { passwordMismatch: true };
    }

    async onSubmit(): Promise<void> {
        if (this.form.untouched) {
            this.form.markAllAsTouched()
            return
        }

        if (this.form.invalid) {
            return
        }

        const { success, payload } = await requestApiHelper(
            interceptor.post(
                "register",
                {
                    email: this.form.get('email')!.value as string,
                    displayName: this.form.get('displayName')!.value as string,
                    password: this.form.get('password')!.value as string
                }
            )
        )

        if (success) {
            localStorage.setItem('user', JSON.stringify(payload));
            localStorage.setItem('isLoggedIn', 'true');
            this.sharedStateService.setLoginStatus(true);
            await this.router.navigate(["/"]);
            return
        }

        alert("Registration failed. Try again.")
    }
}