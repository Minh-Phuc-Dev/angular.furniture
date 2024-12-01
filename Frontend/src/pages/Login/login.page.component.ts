import {NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import interceptor, {requestApiHelper} from 'apis/Interceptor';
import {ToastComponent} from 'components/Toast/toast.component';
import {MessageService} from 'primeng/api';
import {SharedStateService} from 'services/authenticate.service';

@Component(
    {
        selector: 'login-page',
        standalone: true,
        templateUrl: 'login.page.component.html',
        imports: [
            FormsModule,
            ReactiveFormsModule,
            NgIf,
            RouterLink,
            ToastComponent
        ],
        providers: [
            MessageService
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


    constructor(private sharedStateService: SharedStateService, private router: Router, private messageService: MessageService) {

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
            email: this.form.get('username')!.value,
            password: this.form.get('password')!.value
        };

        const {code} = await requestApiHelper(
            interceptor.post(
                "login",
                formValues
            )
        )

        if(code === 200){
            this.sharedStateService.setLoginStatus(true)

            await this.router.navigate(['/'])
            return
        }

        alert(
            "Login failed"
        )
    }
}
