import {NgForOf, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BannerComponent} from 'components/Banner/banner.component';
import {CategoriesComponent} from 'components/Categories/categories.component';
import {TopNewsComponent} from 'components/TopNews/top.news.component';
import {Order} from 'data';
import {SharedStateService} from 'services/shared.service';

@Component({
    selector: 'cart-page',
    standalone: true,
    imports: [BannerComponent, CategoriesComponent, TopNewsComponent, NgIf, RouterLink, NgForOf],
    templateUrl: 'complete.payment.page.component.html',
})

export class CompletePayment {
    protected isSuccess: boolean = false

    constructor(private sharedStateService: SharedStateService) {
        this.sharedStateService.getOrder().subscribe(
            orders => {
                localStorage.setItem("orders", JSON.stringify(orders))
            }
        )

        const order = this.saveOrder()
        if (order?.method === "COD") {
            this.isSuccess = true
            return;
        }
        this.saveOrderVNPay(order!)
    }

    private saveOrder() {
        if(!localStorage.getItem("order")){
            return
        }
        const order = JSON.parse(localStorage.getItem("order")!)
        this.sharedStateService.addOrder(order)
        localStorage.removeItem("order")
        localStorage.removeItem("cart")
        this.sharedStateService.clearCart()
        return order as Order
    }

    private saveOrderVNPay(order: Order) {
        const params = new URLSearchParams(location.search);
        const payload = {
            orderId: params.get("vnp_TxnRef"),
            responseCode: params.get("vnp_ResponseCode"),
        }
        this.isSuccess = order.id === payload.orderId && payload.responseCode === "00"
    }
}
