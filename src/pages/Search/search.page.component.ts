import {NgForOf, NgIf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BannerComponent} from 'components/Banner/banner.component';
import {CategoriesComponent} from 'components/Categories/categories.component';
import {ProductComponent} from 'components/Product/product.component';
import {TopNewsComponent} from 'components/TopNews/top.news.component';
import {Product, PRODUCTS} from 'data';


@Component({
    selector: 'search-page',
    standalone: true,
    imports: [BannerComponent, CategoriesComponent, TopNewsComponent, NgIf, RouterLink, ProductComponent, NgForOf],
    templateUrl: 'search.page.component.html',
})
export class SearchPage implements OnInit{

    protected products: Product[] = PRODUCTS

    constructor(private router: ActivatedRoute) {
    }

    ngOnInit(): void {
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
