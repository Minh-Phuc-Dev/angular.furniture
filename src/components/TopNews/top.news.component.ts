import {NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {ProductComponent} from 'components/Product/product.component';
import {Product, PRODUCTS} from 'data';

@Component({
    selector: 'home-top-news',
    standalone: true,
    imports: [ProductComponent, NgForOf],
    templateUrl: 'top.news.component.html'
})
export class TopNewsComponent {
    protected products = PRODUCTS.length >= 8 ? this.shuffle(PRODUCTS).slice(0, 8) : this.shuffle(PRODUCTS);
    constructor() { }
    shuffle(array: Product[]): Product[] {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
