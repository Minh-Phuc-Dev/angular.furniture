import {NgForOf, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BannerComponent} from 'components/Banner/banner.component';
import {CategoriesComponent} from 'components/Categories/categories.component';
import {TopNewsComponent} from 'components/TopNews/top.news.component';
import {ProductCart} from 'data';
import {SharedStateService} from 'services/shared.service';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

@Component({
    selector: 'cart-page',
    standalone: true,
    imports: [BannerComponent, CategoriesComponent, TopNewsComponent, NgIf, RouterLink, NgForOf],
    templateUrl: 'complete.payment.page.component.html',
    providers: [SharedStateService]
})

export class CompletePayment {
    protected isSuccess: boolean = false

    constructor(private sharedStateService: SharedStateService) {
        const params = new URLSearchParams(window.location.search);
        const payload = {
            orderId: params.get("vnp_TxnRef"),
            responseCode: params.get("vnp_ResponseCode"),
        }
        const isSuccess = localStorage.getItem("orderId") === payload.orderId && payload.responseCode === "00"

        this.isSuccess = isSuccess

        if(!isSuccess){
            return
        }

        const json = localStorage.getItem("orders")
        const orders = json?.startsWith("[") && json.endsWith("]") ? JSON.parse(json) : []
        orders.push(
            {
                id: payload.orderId,
                cart: JSON.parse(localStorage.getItem("cart") ?? "[]")
            }
        )
        localStorage.setItem("orders", JSON.stringify(orders))
        localStorage.removeItem("orderId")
        localStorage.removeItem("cart")
        this.sharedStateService.clearCart()
    }
}