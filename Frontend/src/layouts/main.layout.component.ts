import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BannerComponent} from 'components/Banner/banner.component';
import {FooterComponent} from 'components/Footer/footer.component';
import {HeaderComponent} from "components/Header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BannerComponent, FooterComponent ],
  templateUrl: 'main.layout.component.html'
})
export class MainLayoutComponent {
  title = 'furniture';
}
