import {Component} from '@angular/core';
import {BannerComponent} from 'components/Banner/banner.component';
import {CategoriesComponent} from 'components/Categories/categories.component';
import {ToastComponent} from 'components/Toast/toast.component';
import {TopNewsComponent} from 'components/TopNews/top.news.component';
import {MessageService} from 'primeng/api';


@Component({
    selector: 'home-page',
    standalone: true,
    imports: [BannerComponent, CategoriesComponent, TopNewsComponent],
    templateUrl: 'home.page.component.html',
})
export class HomePage {
    title = 'furniture';
}
