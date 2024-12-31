import {NgForOf, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import interceptor from 'apis/Interceptor';
import {getImageUrl, requestApiHelper} from 'helpers';
import {SharedStateService} from 'services/shared.service';
import {Product} from 'types/Product';
import {Cart} from 'types/Cart';

@Component({
    selector: 'cart-page',
    standalone: true,
    imports: [NgIf, RouterLink, NgForOf, ReactiveFormsModule],
    templateUrl: 'cart.page.component.html',
})

export class CartPage {

    form: FormGroup<{
        fullName: FormControl<string | null>,
        address: FormControl<string | null>,
        phone: FormControl<string | null>,
        method: FormControl<string | null>
    }> = new FormGroup(
        {
            fullName: new FormControl("", [Validators.required]),
            address: new FormControl("", [Validators.required]),
            phone: new FormControl("", [Validators.required]),
            method: new FormControl("COD", [Validators.required]),
        }
    )

    protected cart: Cart<Product>[] = []

    constructor(private sharedStateService: SharedStateService, private router: Router) {
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
        return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
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

    async submitForm(): Promise<void> {
        const body = {
            paymentMethod: this.form.value.method,
            attributes: {
                fullName: this.form.value.fullName,
                streetAddress: this.form.value.address,
                phoneNumber: this.form.value.phone
            },
            products: this.cart.map(
                item => item.product.id
            ),
            callbackUrl: this.form.value.method === "VNPAY" ? `${window.location.origin}/complete-payment` : ""
        }

        const {error, code, payload} = await requestApiHelper(
            interceptor.post(
                "orders",
                body
            )
        )

        if(error){
            alert("Payment failed. Try again.")
            return
        }

        if(code === 100){

            location.href = (payload as unknown as {url: string}).url
            return
        }

        alert("Payment successful. Please wait for 3-5 minutes to receive your order.")
        await this.router.navigate(["/complete-payment"])

    }


    getImageUrl = getImageUrl


    // async submitForm(): Promise<void> {
    //     const orderId = uuidv4().toString()
    //     localStorage.setItem(
    //         "order",
    //         JSON.stringify(
    //             {
    //                 id: orderId,
    //                 address: this.form.value.address,
    //                 phone: this.form.value.phone,
    //                 method: this.form.value.method,
    //                 items: this.cart,
    //                 total: this.getTotalPrice()
    //             }
    //         )
    //     )
    //     await this.router.navigate(["/complete-payment"])
    // }
    //
    // generateUrl(): void {
    //     const ip = "127.0.0.1";
    //     const USD_TO_VND_RATE = 24874;
    //     const orderId = uuidv4().toString()
    //     localStorage.setItem(
    //         "order",
    //         JSON.stringify(
    //             {
    //                 id: orderId,
    //                 address: this.form.value.address,
    //                 phone: this.form.value.phone,
    //                 method: this.form.value.method,
    //                 items: this.cart,
    //                 total: this.getTotalPrice()
    //             }
    //         )
    //     )
    //
    //     const params: Record<string, string | number> = {
    //         vnp_Command: "pay",
    //         vnp_Amount: this.getTotalPrice() * USD_TO_VND_RATE * 100,
    //         vnp_CreateDate: this.formatDate(new Date()),
    //         vnp_CurrCode: "VND",
    //         vnp_IpAddr: ip,
    //         vnp_Locale: "vn",
    //         vnp_OrderInfo: "Purchase",
    //         vnp_OrderType: "other",
    //         vnp_ReturnUrl: this.VNPAY_CALLBACK_URL,
    //         vnp_TmnCode: this.VNPAY_CODE,
    //         vnp_TxnRef: orderId,
    //         vnp_Version: "2.1.0",
    //     };
    //
    //     const sortedParams = Object.fromEntries(
    //         Object.entries(params).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    //     );
    //
    //     const signData = new URLSearchParams(sortedParams as Record<string, string>).toString();
    //
    //     const vnp_SecureHash = CryptoJS.HmacSHA512(signData, this.VNPAY_HASH_SECRET).toString(CryptoJS.enc.Hex);
    //
    //     const query = new URLSearchParams({
    //         ...sortedParams,
    //         vnp_SecureHash,
    //     } as Record<string, string>).toString();
    //
    //     window.location.href = `${this.VNPAY_URL}?${query}`
    // }

}
