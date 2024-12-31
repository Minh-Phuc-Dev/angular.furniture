import {Injectable} from '@angular/core';
import interceptor from 'apis/Interceptor';
import { requestApiHelper } from 'helpers';

import {BehaviorSubject} from 'rxjs';
import { Cart } from 'types/Cart';
import { Order } from 'types/Order';
import {Product} from 'types/Product';

@Injectable({
    providedIn: 'root'
})

export class SharedStateService  {
    private loginStatus = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');
    private cart = new BehaviorSubject<Cart<Product>[]>([])
    private order = new BehaviorSubject<Order[]>([])


    async loadCart(): Promise<Cart[]> {
        const {success, payload} = await requestApiHelper<Cart<Product>[]>(
            interceptor.get('cart')
        )

        this.cart.next(success ? payload! : [])

        return success ? payload! : []
    }

    async loadOrder(): Promise<Order[]> {
        const {success, payload} = await requestApiHelper<Order[]>(
            interceptor.get('orders')
        )

        this.order.next(success ? payload! : [])

        return success ? payload! : []
    }


    constructor() {
        this.cart.subscribe(cart => {
            localStorage.setItem('cart', JSON.stringify(cart));
        });
        this.order.subscribe(orders => {
            localStorage.setItem('orders', JSON.stringify(orders));
        })
    }

    getLoginStatus() {
        return this.loginStatus.asObservable();
    }

    setLoginStatus(status: boolean) {
        this.loginStatus.next(status);
        localStorage.setItem('isLoggedIn', status.toString());
    }

    getCart() {
        return this.cart.asObservable();
    }


    async addToCart(productId: number) {
        const {success} = await requestApiHelper<Cart>(
            interceptor.post('cart', {productId, quantity: 1})
        )
        if(success) {
            this.loadCart();
        }

    }

    async removeFromCart(productId: number) {
        const {success} = await requestApiHelper<Cart>(
            interceptor.delete('cart', {data: {productId, quantity: 1}})
        )
        if(success) {
            this.loadCart();
        }
    }

    clearCart() {
        this.cart.next([]);
    }

    getOrder() {
        return this.order.asObservable();
    }

    addOrder(order: Order) {
        const orders = [...this.order.value]
        orders.push(order)
        this.order.next(orders)
    }

    clearOrder() {
        this.order.next([])
    }
}
