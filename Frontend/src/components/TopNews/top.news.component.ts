import {NgForOf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import interceptor from 'apis/Interceptor';
import {ProductComponent} from 'components/Product/product.component';
import { requestApiHelper } from 'helpers';
import { Product } from 'types/Product';


@Component({
    selector: 'home-top-news',
    standalone: true,
    imports: [ProductComponent, NgForOf],
    templateUrl: 'top.news.component.html'
})
export class TopNewsComponent implements OnInit{
    protected products : Product[] = []
    constructor() { }
     
    async ngOnInit(): Promise<void> {
        const {success, payload} = await requestApiHelper<Product[]>(
            interceptor.get('/products')
        )
        if(success){
            this.products = payload!.slice(0, 8)
        }
    }
}
