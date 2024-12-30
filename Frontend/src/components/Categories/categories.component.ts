import {NgForOf} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import interceptor from 'apis/Interceptor';

import { getImageUrl, requestApiHelper } from 'helpers';
import { Category } from 'types/Category';

@Component({
    selector: 'home-categories',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink,
    ],
    templateUrl: 'categories.component.html'
})
export class CategoriesComponent implements OnInit {
    protected categories: Category[]
    constructor() {
        this.categories = []
    }
    async ngOnInit(): Promise<void> {
        const {success, payload}  = await requestApiHelper<Category[]>(
            interceptor.get('/categories')
        )

        if(success){
            this.categories = payload!
        }
    }
    getImageUrl = getImageUrl
}
