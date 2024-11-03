import {Component} from '@angular/core';
import {BannerComponent} from 'components/Banner/banner.component';
import {CategoriesComponent} from 'components/Categories/categories.component';


@Component({
    selector: 'home-page',
    standalone: true,
    imports: [BannerComponent, CategoriesComponent],
    templateUrl: 'home.page.component.html',
})
export class HomePage {
    title = 'furniture';
}
