import {NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CATEGORIES, Category} from 'data';

@Component({
    selector: 'home-categories',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
    templateUrl: 'categories.component.html'
})
export class CategoriesComponent {
    protected categories: Category[]
    constructor() {
        this.categories = CATEGORIES
    }
}
