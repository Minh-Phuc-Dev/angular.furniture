import {Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'search-page',
    standalone: true,
    templateUrl: 'contact.page.component.html',
    imports: [
        RouterLink
    ]
})
export class ContactPage{

   title = 'Contact Us';

}
