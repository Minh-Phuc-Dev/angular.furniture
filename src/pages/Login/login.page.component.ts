import {NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {getAccount} from 'data';
import {SharedStateService} from 'services/shared.service';

@Component(
    {
        selector: 'login-page',
        standalone: true,
        templateUrl: 'login.page.component.html',
        imports: [
            FormsModule,
            ReactiveFormsModule,
            NgIf
        ]
    }
)

export class LoginPage {
    protected form: FormGroup = new FormGroup(
        {
            username: new FormControl("", [Validators.email, Validators.required]),
            password: new FormControl("", [Validators.required])
        }
    )


    constructor(private sharedStateService: SharedStateService, private router: Router) {

    }

    async onSubmit(): Promise<void> {
        if (this.form.untouched) {
            this.form.markAllAsTouched()
            return
        }

        if (this.form.invalid) {
            return
        }

        const formValues = {
            username: this.form.get('username')!.value,
            password: this.form.get('password')!.value
        };

        if(getAccount({email: formValues.username, password: formValues.password})){
            this.sharedStateService.setLoginStatus(true)
            await this.router.navigate(['/']);
            return
        }
        alert("Login failed. Try again.")
    }
}
