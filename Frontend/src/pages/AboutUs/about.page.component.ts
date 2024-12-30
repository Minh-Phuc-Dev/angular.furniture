import {Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'search-page',
    standalone: true,
    templateUrl: 'about.page.component.html',
    imports: [
        RouterLink
    ]
})
export class AboutPage{

   title = 'About Us';

}
