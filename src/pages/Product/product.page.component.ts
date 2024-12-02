import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product, PRODUCTS } from 'data';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { SharedStateService } from 'services/shared.service';

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
export class ProductPage  implements OnInit{
    id: number = 0;
    product?: Product 
   title = 'Product';
   constructor(private route: ActivatedRoute, private sharedStateService: SharedStateService, private messageService: MessageService) { }

   ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') ?? "0")
    this.id = id

    this.product = PRODUCTS.find(
        product => product.id === id
    )

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

}
