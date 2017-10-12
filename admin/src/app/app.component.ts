import {Component, enableProdMode, HostBinding, OnInit} from '@angular/core';
import { environment } from '../environments/environment';
import {LoopBackConfig} from './shared/sdk/lb.config';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  @HostBinding('class') public cssClass = 'gray-bg';

  constructor() {

    // Configure loopback
    LoopBackConfig.setBaseURL(environment.loopback.baseUrl);

  }


}
