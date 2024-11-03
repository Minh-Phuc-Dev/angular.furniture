import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NavigationComponent} from 'components/Header/header.navigation.component';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NavigationComponent
    ]
})

export class HeaderComponent implements OnInit {
    searchForm: FormGroup = new FormGroup(
        {
            search: new FormControl('')
        }
    );
    searchParams: any;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.searchParams = this.router.parseUrl(this.router.url).queryParams;
    }

    async handleOnSubmit(): Promise<void> {
        const searchValue = this.searchForm!.get('search')?.value;
        await this.router.navigate(['/search'], {queryParams: {search: searchValue}});
    }
}
