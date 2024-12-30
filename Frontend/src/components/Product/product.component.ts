import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {SharedStateService} from 'services/shared.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Product } from 'types/Product';
import { getImageUrl } from 'helpers';

@Component({
    selector: 'product',
    standalone: true,
    imports: [
        RouterLink,
        ToastModule,
        ButtonModule,
        RippleModule
    ],
    templateUrl: 'product.component.html',
    providers: [
        MessageService,
    ],
})

export class ProductComponent {
    @Input() item!: Product;
    constructor(private sharedStateService: SharedStateService, private messageService: MessageService) { }

    addToCart() {
        this.sharedStateService.addToCart(this.item.id);
        this.messageService.add(
            {
                severity: 'success',
                summary: 'Success',
                detail: `${this.item.name} added to cart.`
            }
        )

    }

    protected readonly event = event;
    getImageUrl = getImageUrl
}
