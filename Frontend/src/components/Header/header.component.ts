import {NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import interceptor from 'apis/Interceptor';
import {NavigationComponent} from 'components/Header/header.navigation.component';
import {getImageUrl, requestApiHelper} from 'helpers';
import {SharedStateService} from 'services/shared.service';
import {Cart} from 'types/Cart';
import {Order} from 'types/Order';
import {Product} from 'types/Product';

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
    protected cart: Cart<Product>[]= []
    protected order: Order[] = []

    constructor(private router: Router, private sharedStateService: SharedStateService) {
        this.sharedStateService.getLoginStatus().subscribe(
            login => this.isLoggedIn = login
        )
        this.sharedStateService.getCart().subscribe(
            cart => this.cart = cart

        )
        this.sharedStateService.getOrder().subscribe(
            orders => this.order = orders
        )
        this.sharedStateService.loadCart();
        this.sharedStateService.loadOrder();
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

    async cancelOrder(orderId: number) {
        await requestApiHelper(
            interceptor.patch(
                "orders/status",
                {
                    id: orderId,
                    status: "CANCELED"
                }
            )
        )
        await this.sharedStateService.loadOrder();
    }
    getImageUrl = getImageUrl
}
