import {Injectable} from '@angular/core';
import {Order, ProductCart, PRODUCTS} from 'data';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SharedStateService  {
    private loginStatus = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') === 'true');
    private cart = new BehaviorSubject<ProductCart[]>(this.getInitialCart())
    private order = new BehaviorSubject<Order[]>(this.getInitialOrder())


    private getInitialCart(): ProductCart[] {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    private getInitialOrder(): Order[] {
        const storedOrder = localStorage.getItem('orders');
        return storedOrder ? JSON.parse(storedOrder) : [];
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

    addToCart(productId: number) {
        const cart = [...this.cart.value]
        const existingProduct = cart.findIndex(item => item.id === productId);

        if (existingProduct !== -1) {
            cart.splice(
                existingProduct,
                1,
                {
                    ...cart[existingProduct],
                    quantity: cart[existingProduct].quantity + 1
                }
            );
            this.cart.next(cart);
            return
        }

        const product = PRODUCTS.find(
            item => item.id === productId
        )

        if (product) {
            cart.push(
                {
                    ...product,
                    quantity: 1
                }
            )
            this.cart.next(cart);
        }
    }

    removeFromCart(productId: number) {
        const cart = [...this.cart.value]
        const existingProduct = cart.findIndex(item => item.id === productId);

        if (existingProduct === -1) {
            return;

        }

        if(cart[existingProduct].quantity <= 1) {
            cart.splice(existingProduct, 1);
            this.cart.next(cart);
            return
        }

        cart.splice(
            existingProduct,
            1,
            {
                ...cart[existingProduct],
                quantity: cart[existingProduct].quantity - 1
            }
        );

        this.cart.next(cart);
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
