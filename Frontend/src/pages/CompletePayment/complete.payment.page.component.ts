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

}
