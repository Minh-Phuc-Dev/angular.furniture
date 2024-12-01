import {NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from 'components/Header/header.navigation.component';
import {ProductCart} from 'data';
import {SharedStateService} from 'services/authenticate.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NavigationComponent,
        NgIf,
        NgForOf
    ]
})

export class HeaderComponent implements OnInit {
    protected isLoggedIn: boolean = false
    protected cart: ProductCart[]= []


    constructor(private router: Router, private sharedStateService: SharedStateService) {
        this.sharedStateService.getLoginStatus().subscribe(
            login => this.isLoggedIn = login
        )
        this.sharedStateService.getCart().subscribe(
            cart => this.cart = cart
        )
    }
    searchForm: FormGroup = new FormGroup(
        {
            search: new FormControl('')
        }
    );
    searchParams: any;


    ngOnInit(): void {
        this.searchParams = this.router.parseUrl(this.router.url).queryParams;
    }

    async handleOnSubmit(): Promise<void> {
        const searchValue = this.searchForm!.get('search')?.value;
        await this.router.navigate(['/search'], {queryParams: {search: searchValue}});
    }
}
