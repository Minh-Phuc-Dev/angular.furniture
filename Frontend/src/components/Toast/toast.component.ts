import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ToastModule} from 'primeng/toast';

@Component({
    selector: 'toast',
    standalone: true,
    imports: [
        RouterLink,
        ToastModule,
        ButtonModule,
        RippleModule
    ],
    templateUrl: 'toast.component.html',
})

export class ToastComponent {
    protected readonly event = event;
}
