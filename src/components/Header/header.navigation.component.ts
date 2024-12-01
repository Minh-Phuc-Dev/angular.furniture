import {NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {SharedStateService} from 'services/shared.service';

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
    protected isLoggedIn: boolean = false


    constructor(private router: Router, private sharedStateService: SharedStateService) {
        this.sharedStateService.getLoginStatus().subscribe(
            login => this.isLoggedIn = login
        )
    }


    handleLogout(): void {
        this.sharedStateService.setLoginStatus(false)
    }


    isActive(url: string): boolean {
        return this.router.isActive(url,
            {
                paths: 'exact',
                queryParams: 'exact',
                fragment: 'ignored',
                matrixParams: 'ignored'
            }
        );
    }

}
