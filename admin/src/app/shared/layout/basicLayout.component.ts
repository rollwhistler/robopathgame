import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {detectBody} from '../../app.helpers';

declare var jQuery:any;

@Component({
  selector: 'basic',
  templateUrl: 'basicLayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class BasicLayoutComponent implements OnInit, OnDestroy {

  constructor(private app: AppComponent) { }

  public ngOnInit(): any {
    detectBody();
    this.app.cssClass = '';         // remove gray background
  }

  ngOnDestroy(): void {
    this.app.cssClass = 'gray-bg';  // replace gray background
  }

  public onResize() {
    detectBody();
  }

}
