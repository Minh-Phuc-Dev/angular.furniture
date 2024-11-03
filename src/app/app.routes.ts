import {Routes} from '@angular/router';
import {MainLayoutComponent} from 'layouts/main.layout.component';
import {HomePage} from 'pages/Home/home.page.component';
import {LoginPage} from 'pages/Login/login.page.component';
import {RegisterPage} from 'pages/Register/register.page.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginPage
            },
            {
                path: 'register',
                component: RegisterPage
            },
            {
                path: '',
                component: HomePage
            }
        ]
    }
];
