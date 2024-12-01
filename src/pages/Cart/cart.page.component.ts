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
    templateUrl: 'cart.page.component.html',
})

export class CartPage {

    private VNPAY_URL : string ="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    private VNPAY_CODE: string ="Y1N9M9TY"
    private VNPAY_HASH_SECRET: string = "43EPGXDJJCE4CG6M8WRAI9OAYNM9RL4I"
    private VNPAY_CALLBACK_URL: string = `${window.location.origin}/complete-payment`
    protected cart: ProductCart[] = []

    constructor(private sharedStateService: SharedStateService) {
        this.sharedStateService.getCart().subscribe(
            cart => this.cart = cart
        )
    }

    removeFromCart(productId: number) {
        this.sharedStateService.removeFromCart(productId)
    }

    addToCart(productId: number) {
        this.sharedStateService.addToCart(productId)
    }

    getTotalPrice() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }

    generateUrl(): void {
        const ip = "127.0.0.1";
        const USD_TO_VND_RATE = 24874;
        const orderId = uuidv4().toString()
        localStorage.setItem("orderId", orderId)

        const params: Record<string, string | number> = {
            vnp_Command: "pay",
            vnp_Amount: this.getTotalPrice() * USD_TO_VND_RATE * 100,
            vnp_CreateDate: this.formatDate(new Date()),
            vnp_CurrCode: "VND",
            vnp_IpAddr: ip,
            vnp_Locale: "vn",
            vnp_OrderInfo: "Purchase",
            vnp_OrderType: "other",
            vnp_ReturnUrl: this.VNPAY_CALLBACK_URL,
            vnp_TmnCode: this.VNPAY_CODE,
            vnp_TxnRef: orderId,
            vnp_Version: "2.1.0",
        };

        const sortedParams = Object.fromEntries(
            Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        );

        const signData = new URLSearchParams(sortedParams as Record<string, string>).toString();

        const vnp_SecureHash = CryptoJS.HmacSHA512(signData, this.VNPAY_HASH_SECRET).toString(CryptoJS.enc.Hex);

        const query = new URLSearchParams({
            ...sortedParams,
            vnp_SecureHash,
        } as Record<string, string>).toString();

        window.location.href = `${this.VNPAY_URL}?${query}`
    }
}
