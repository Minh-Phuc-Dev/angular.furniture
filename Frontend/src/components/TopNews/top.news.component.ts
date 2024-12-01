import {NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {ProductComponent} from 'components/Product/product.component';
import {PRODUCTS} from 'data';

@Component({
    selector: 'home-top-news',
    standalone: true,
    imports: [ProductComponent, NgForOf],
    templateUrl: 'top.news.component.html'
})
export class TopNewsComponent {
    protected products = PRODUCTS.slice(0, 4)
    constructor() { }
}
