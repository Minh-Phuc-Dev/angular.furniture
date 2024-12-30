import {NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import interceptor from 'apis/Interceptor';
import {ProductComponent} from 'components/Product/product.component';
import { requestApiHelper } from 'helpers';
import { Product } from 'types/Product';

@Component({
    selector: 'search-page',
    standalone: true,
    imports: [NgIf, RouterLink, ProductComponent, NgForOf],
    templateUrl: 'search.page.component.html',
})
export class SearchPage implements OnInit{

    protected products: Product[] = []

    constructor(private router: ActivatedRoute) {
    }

    async ngOnInit(): Promise<void> {

        const {success, payload} = await requestApiHelper<Product[]>(
            interceptor.get('/products')
        );
        const PRODUCTS = success ? payload! : []

        this.router.queryParams.subscribe(
            params => {
                const search = params['search'] as string;
                if(search === undefined || search?.trim().length <= 0){
                    this.products = PRODUCTS
                    return
                }
                this.products = PRODUCTS.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
            }
        )
    }

}
