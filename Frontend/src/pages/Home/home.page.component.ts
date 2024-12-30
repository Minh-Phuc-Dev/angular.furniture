import {Component} from '@angular/core';
import {BannerComponent} from 'components/Banner/banner.component';
import {CategoriesComponent} from 'components/Categories/categories.component';
import {TopNewsComponent} from 'components/TopNews/top.news.component';


@Component({
    selector: 'home-page',
    standalone: true,
    imports: [BannerComponent, CategoriesComponent, TopNewsComponent],
    templateUrl: 'home.page.component.html',
})
export class HomePage {
    title = 'furniture';
}
