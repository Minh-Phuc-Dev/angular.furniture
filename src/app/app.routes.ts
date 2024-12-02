import {Routes} from '@angular/router';
import {MainLayoutComponent} from 'layouts/main.layout.component';
import {CartPage} from 'pages/Cart/cart.page.component';
import {CompletePayment} from 'pages/CompletePayment/complete.payment.page.component';
import {HomePage} from 'pages/Home/home.page.component';
import {LoginPage} from 'pages/Login/login.page.component';
import {RegisterPage} from 'pages/Register/register.page.component';
import {SearchPage} from 'pages/Search/search.page.component';

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
                path: "cart",
                component: CartPage
            },
            {
                path: "complete-payment",
                component: CompletePayment
            },
            {
                path: "search",
                component: SearchPage
            },
            {
                path: '',
                component: HomePage
            },
        ]
    }
];
