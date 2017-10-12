import { Component } from '@angular/core';
import {environment} from '../environments/environment';
import {LoopBackConfig} from './shared/sdk/lb.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor() {

    // Configure loopback
    LoopBackConfig.setBaseURL(environment.loopback.baseUrl);

  }

}
