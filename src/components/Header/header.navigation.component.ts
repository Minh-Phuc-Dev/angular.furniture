import {NgIf} from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
    templateUrl: "header.navigation.component.html"
})
export class NavigationComponent {
    isLoggedIn : boolean

    constructor(private router: Router) {
        this.isLoggedIn = false
    }



    handleLogout(): void {
    }

    isActive(url: string): boolean {
        return this.router.isActive(url, true);
    }

}
