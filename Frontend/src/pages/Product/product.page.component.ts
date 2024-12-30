import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import interceptor from 'apis/Interceptor';
import { getImageUrl, requestApiHelper } from 'helpers';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { SharedStateService } from 'services/shared.service';
import { Product } from 'types/Product';

@Component({
    selector: 'product-page',
    standalone: true,
    templateUrl: 'product.page.component.html',
    imports: [
        ToastModule,
        ButtonModule,
        RippleModule,
        RouterLink
    ],
    providers: [
        MessageService,
    ],
})
export class ProductPage implements OnInit {
    id: number = 0;
    product?: Product
    title = 'Product';
    constructor(private route: ActivatedRoute, private sharedStateService: SharedStateService, private messageService: MessageService) { }

    async ngOnInit(): Promise<void> {
        const id = parseInt(this.route.snapshot.paramMap.get('id') ?? "0")
        this.id = id

        const { success, payload } = await requestApiHelper<Product>(interceptor.get('product', { params: { slug: id } }));

        if (success) {
            console.log(payload);

            this.product = payload!;
            return
        }

    }

    addToCart() {
        this.sharedStateService.addToCart(this.id);
        this.messageService.add(
            {
                severity: 'success',
                summary: 'Success',
                detail: `${this.product?.name} added to cart.`
            }
        )

    }

    protected readonly event = event;
    getImageUrl = getImageUrl

}
